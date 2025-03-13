"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/features/tasks/taskSlice';
import type { AppDispatch, RootState } from "@/redux/store";
import { formatDistanceToNow } from 'date-fns';

interface SearchBarProps {
    onTaskClick: (task: Task) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onTaskClick }) => {
    const dispatch = useDispatch<AppDispatch>();
    const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    
    // Filter tasks based on search query
    const filteredTasks = tasks.filter(task => 
        searchQuery && (
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Close recommendations when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowRecommendations(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Format the time since the task was created
    const formatTimeAgo = (timestamp: string) => {
        try {
            return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
        } catch (error) {
            return "Unknown time";
        }
    };

    return (
        <div className="relative w-full max-w-xl mx-auto mb-6" ref={searchRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                    dispatch(setSearchQuery(e.target.value));
                    setShowRecommendations(true);
                }}
                onFocus={() => setShowRecommendations(true)}
                placeholder="Search tasks by title or description..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            
            {/* Search Recommendations */}
            {showRecommendations && searchQuery && filteredTasks.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                    <ul className="py-1">
                        {filteredTasks.map(task => (
                            <li 
                                key={task._id}
                                onClick={() => {
                                    onTaskClick(task);
                                    setShowRecommendations(false);
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-800">{task.title}</p>
                                        {task.description && (
                                            <p className="text-sm text-gray-500 truncate">{task.description}</p>
                                        )}
                                    </div>
                                    {task.createdAt && (
                                        <div className="flex items-center text-xs text-gray-400 ml-2">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatTimeAgo(task.createdAt)}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {task.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
};

export default SearchBar
