"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, CheckCircle2, Circle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/redux/store"
import { cn } from "@/lib/utils"
import { deleteTask, updateTask } from "@/redux/features/tasks/taskThunk"


export default function TaskItem({ task, onClick, onEditClick }: TaskItemProps) {
    const dispatch = useDispatch<AppDispatch>()

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(task._id))
        }
    }

    const handleToggleStatus = (e: React.MouseEvent) => {
        e.stopPropagation()
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

    const getStatusIcon = () => {
        switch (task.status) {
            case "pending":
                return <Circle className="h-4 w-4 text-muted-foreground" />
            case "in-progress":
                return <Clock className="h-4 w-4 text-blue-500" />
            case "completed":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />
            default:
                return <Circle className="h-4 w-4 text-muted-foreground" />
        }
    }

    return (
        <Card
            className={cn(
                "cursor-pointer hover:shadow-md transition-shadow",
                task.status === "completed" ? "bg-muted/50" : "bg-card",
            )}
            onClick={onClick}
        >
            <CardContent className="p-3">
                <div className="flex items-start">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6 mr-2 mt-0.5 rounded-full"
                        onClick={handleToggleStatus}
                    >
                        {getStatusIcon()}
                    </Button>

                    <div className="flex-1 mr-2">
                        <h4
                            className={cn(
                                "font-medium line-clamp-2",
                                task.status === "completed" && "line-through text-muted-foreground",
                            )}
                        >
                            {task.title}
                        </h4>
                        {task.description && (
                            <p
                                className={cn(
                                    "text-sm text-muted-foreground line-clamp-1 mt-1",
                                    task.status === "completed" && "line-through",
                                )}
                            >
                                {task.description}
                            </p>
                        )}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEditClick()
                                }}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleDelete}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}
