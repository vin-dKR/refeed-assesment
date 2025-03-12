"use client"

import React from "react"
import { CustomDialog, CustomDialogContent, CustomDialogHeader, CustomDialogTitle } from "@/components/ui/custom-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, CheckCircle2, Circle, Clock } from "lucide-react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/redux/store"
import { deleteTask, updateTask } from "@/redux/features/tasks/taskThunk"
import { cn } from "@/lib/utils"


export default function TaskDetailModal({ task, isOpen, onClose, onEditClick }: TaskDetailModalProps) {
    const dispatch = useDispatch<AppDispatch>()

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            case "in-progress":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200"
            case "completed":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    const getStatusIcon = () => {
        switch (task.status) {
            case "pending":
                return <Circle className="h-4 w-4 mr-1" />
            case "in-progress":
                return <Clock className="h-4 w-4 mr-1" />
            case "completed":
                return <CheckCircle2 className="h-4 w-4 mr-1" />
            default:
                return <Circle className="h-4 w-4 mr-1" />
        }
    }

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this task?")) {
            await dispatch(deleteTask(task._id))
            onClose()
        }
    }

    const handleToggleStatus = () => {
        const newStatus = task.status === "completed" ? "pending" : "completed"

        dispatch(
            updateTask({
                id: task._id,
                title: task.title,
                description: task.description,
                status: newStatus,
            }),
        )
    }

    return (
        <CustomDialog open={isOpen} onOpenChange={onClose}>
            <CustomDialogContent className="sm:max-w-lg">
                <CustomDialogHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex items-start">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-6 w-6 mr-2 mt-1 rounded-full"
                                onClick={handleToggleStatus}
                            >
                                {getStatusIcon()}
                            </Button>
                            <CustomDialogTitle
                                className={cn("text-2xl", task.status === "completed" && "line-through text-muted-foreground")}
                            >
                                {task.title}
                            </CustomDialogTitle>
                        </div>
                        <Badge className={getStatusColor(task.status)}>
                            <div className="flex items-center">
                                {getStatusIcon()}
                                {task.status === "pending" ? "To Do" : task.status === "in-progress" ? "In Progress" : "Completed"}
                            </div>
                        </Badge>
                    </div>
                </CustomDialogHeader>

                <div className="mt-2">
                    <p className={cn("whitespace-pre-wrap", task.status === "completed" && "line-through text-muted-foreground")}>
                        {task.description}
                    </p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onEditClick}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </CustomDialogContent>
        </CustomDialog>
    )
}
