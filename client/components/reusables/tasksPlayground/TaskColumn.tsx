"use client"

import TaskItem from "./TaskItem"


export default function TaskColumn({ title, tasks, onTaskClick, onEditClick }: TaskColumnProps) {
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
