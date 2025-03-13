"use client"
import React,{ useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import TaskColumn from "./TaskColumn"
import TaskDetailModal from "../tasksPopups/TaskDetailModal"
import EditTaskModal from "../tasksPopups/TaskEdit"
import SearchBar from "../SearchBar"
import { getPendingTasks, getInProgressTasks, getCompletedTasks } from '@/redux/selector'

const TaskBoard = () => {
    const pendingTasks = useSelector(getPendingTasks);
    const inProgressTasks = useSelector(getInProgressTasks);
    const completedTasks = useSelector(getCompletedTasks);
    
    const hasNoTasks = useSelector((state: RootState) => state.tasks.ids.length === 0);
    
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)
    
    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
        setIsDetailModalOpen(true)
    }
    
    const handleEditClick = (task: Task) => {
        setEditingTask(task)
        setIsEditModalOpen(true)
    }
    
    return (
        <div className="h-full flex flex-col">
            <SearchBar onTaskClick={handleTaskClick} />
            
            {hasNoTasks && (
                <div className="min-h-[400px] flex items-center justify-center text-muted-foreground text-sm border rounded-lg mb-4">No tasks at this moment!</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                <TaskColumn 
                    title="To Do" 
                    tasks={pendingTasks} 
                    onTaskClick={handleTaskClick} 
                    onEditClick={handleEditClick} 
                />
                <TaskColumn
                    title="In Progress"
                    tasks={inProgressTasks}
                    onTaskClick={handleTaskClick}
                    onEditClick={handleEditClick}
                />
                <TaskColumn
                    title="Completed"
                    tasks={completedTasks}
                    onTaskClick={handleTaskClick}
                    onEditClick={handleEditClick}
                />
            </div>
            
            {isEditModalOpen && (
                <EditTaskModal
                    task={editingTask}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
            
            {isDetailModalOpen && selectedTask && (
                <TaskDetailModal
                    task={selectedTask}
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    onEditClick={() => {
                        setIsDetailModalOpen(false)
                        handleEditClick(selectedTask)
                    }}
                />
            )}
        </div>
    )
}

export default React.memo(TaskBoard);
