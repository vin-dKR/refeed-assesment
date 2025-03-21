"use client"

import React from "react"
import TaskItem from "./TaskItem"

const TaskColumnComponent = ({ title, tasks, onTaskClick, onEditClick }: TaskColumnProps) => {
    return (
        <div className="bg-muted/40 rounded-lg p-4 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">{title}</h3>
                <span className="bg-muted text-muted-foreground text-sm px-2 py-1 rounded-full">{tasks.length}</span>
            </div>
            <div className="overflow-y-auto flex-1 -mx-2 px-2">
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onClick={() => onTaskClick(task)}
                            onEditClick={() => onEditClick(task)}
                        />
                    ))}
                </div>
                {tasks.length === 0 && (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No tasks</div>
                )}
            </div>
        </div>
    )
}

// Custom comparison function for React.memo
const areEqual = (prevProps: TaskColumnProps, nextProps: TaskColumnProps) => {
    if (prevProps.title !== nextProps.title) return false;
    if (prevProps.tasks.length !== nextProps.tasks.length) return false;
    
    // Compare task IDs to see if the array contents changed
    const prevIds = prevProps.tasks.map(task => task._id).join(',');
    const nextIds = nextProps.tasks.map(task => task._id).join(',');
    if (prevIds !== nextIds) return false;
    
    // Check if any task content changed
    for (let i = 0; i < prevProps.tasks.length; i++) {
        const prevTask = prevProps.tasks[i];
        const nextTask = nextProps.tasks[i];
        if (
            prevTask.title !== nextTask.title ||
            prevTask.description !== nextTask.description ||
            prevTask.status !== nextTask.status
        ) {
            return false;
        }
    }
    
    return true;
}

const TaskColumn = React.memo(TaskColumnComponent, areEqual);

export default TaskColumn;
