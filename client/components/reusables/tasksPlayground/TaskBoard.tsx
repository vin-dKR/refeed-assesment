"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import TaskColumn from "./TaskColumn"
import TaskDetailModal from "../tasksPopups/TaskDetailModal"

export default function TaskBoard() {
    const { tasks } = useSelector((state: RootState) => state.tasks)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const pendingTasks = tasks.filter((task) => task.status === "pending")
    const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
    const completedTasks = tasks.filter((task) => task.status === "completed")

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
        setIsDetailModalOpen(true)
    }

    const handleEditClick = (task: Task) => {
        setEditingTask(task)
        setIsFormModalOpen(true)
    }


    return (
        <div className="h-full flex flex-col">
            {tasks.length === 0 && (
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

            {editingTask && (
                <TaskDetailModal
                    task={editingTask}
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    onEditClick={() => {
                        setIsDetailModalOpen(false)
                        handleEditClick(editingTask)
                    }}
                />
            )}
            {selectedTask && (
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


