"use client"

import { Edit, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const priorityColors = {
    low: "bg-green-100 text-green-800 hover:bg-green-200",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    high: "bg-red-100 text-red-800 hover:bg-red-200",
  }

  return (
    <div className={cn("flex items-start gap-3 p-4 rounded-lg border", task.completed ? "bg-muted/40" : "bg-card")}>
        <Checkbox checked={task.completed} onCheckedChange={() => onToggleComplete(task.id)} className="mt-1" />

        <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <h3 className={cn("font-medium break-words", task.completed && "line-through text-muted-foreground")}>
                    {task.title}
                </h3>

                <div className="flex items-center gap-2">
                {/*
                    {task.priority && (
                        <Badge variant="outline" className={priorityColors[task.priority]}>
                            {task.priority}
                        </Badge>
                    )}
                */}

                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => onEdit(task)} className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(task.id)}
                            className="h-8 w-8 text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </div>
            </div>

            {task.description && (
                <p className={cn("text-sm text-muted-foreground mt-1", task.completed && "line-through")}>
                {task.description}
                </p>
            )}

        </div>
    </div>
  )
}


