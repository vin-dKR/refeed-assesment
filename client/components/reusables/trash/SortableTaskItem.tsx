"use client"

import { AppDispatch } from "@/redux/store"
import { useSortable } from "@dnd-kit/sortable"
import React from "react"
import { useDispatch } from "react-redux"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "../ui/card"
import { GripVertical, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"
import { deleteTask } from "@/redux/features/tasks/taskThunk"

export default function SortableTaskItem({ task, onClick, onEditClick }: SortableTaskItemProps) {
    const dispatch = useDispatch<AppDispatch>()

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const handleDelete = (e: MouseEvent) => {
        e.stopPropagation()
        if(confirm("Are u sure u wanna delete this task?")) {
            dispatch(deleteTask(task._id))
        }
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} >
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary" onClick={onClick}>
                <CardContent className="p-3" >
                    <div className="flex items-start justify-between">
                        <div className="flex-1 mr-2">
                            <h4 className="font-medium line-clamp-2">{task.title}</h4>
                            {task.description && (
                                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{task.description}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <div {...listeners} className="cursor-grab active:cursor-grabbing mr-1">
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" >
                                        <MoreHorizontal className="w-4 h-4" />
                                        <span className="sr-only" >Open Menu</span>
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
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
