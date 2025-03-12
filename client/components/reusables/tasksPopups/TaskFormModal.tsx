"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { addTask, updateTask } from "@/redux/features/tasks/taskThunk"
import {
    CustomDialog,
    CustomDialogContent,
    CustomDialogHeader,
    CustomDialogTitle,
    CustomDialogFooter,
} from "@/components/ui/custom-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Circle, Clock } from "lucide-react"


export default function TaskFormModal({ task, isOpen, onClose }: TaskFormModalProps) {
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.tasks)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<"pending" | "in-progress" | "completed">("pending")
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({})

    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setDescription(task.description)
            setStatus(task.status as "pending" | "in-progress" | "completed")
        } else {
            setTitle("")
            setDescription("")
            setStatus("pending")
        }
        setErrors({})
    }, [task, isOpen])

    const validate = () => {
    const newErrors: { title?: string; description?: string } = {}

    if (!title.trim()) {
        newErrors.title = "Title is required"
    }

    if (!description.trim()) {
        newErrors.description = "Description is required"
    }

    setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) return

        if (task) {
            await dispatch(
                updateTask({
                    id: task._id,
                    title: title.trim(),
                    description: description.trim(),
                    status,
                }),
            )
        } else {
            await dispatch(
                addTask({
                    title: title.trim(),
                    description: description.trim(),
                    status,
                }),
            )
        }

        onClose()
    }

    const getStatusIcon = (value: string) => {
        switch (value) {
            case "pending":
                return <Circle className="mr-2 h-4 w-4" />
            case "in-progress":
                return <Clock className="mr-2 h-4 w-4" />
            case "completed":
                return <CheckCircle2 className="mr-2 h-4 w-4" />
            default:
                return null
        }
    }

    return (
        <CustomDialog open={isOpen} onOpenChange={onClose}>
            <CustomDialogContent>
                <CustomDialogHeader>
                    <CustomDialogTitle>{task ? "Edit Task" : "Create New Task"}</CustomDialogTitle>
                </CustomDialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            disabled={loading === "pending"}
                            className="focus-visible:ring-primary"
                        />
                        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            rows={5}
                            disabled={loading === "pending"}
                            className="focus-visible:ring-primary"
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={status}
                            onValueChange={(value: "pending" | "in-progress" | "completed") => setStatus(value)}
                            disabled={loading === "pending"}
                        >
                            <SelectTrigger id="status" className="focus-visible:ring-primary">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">
                                    <div className="flex items-center">
                                        {getStatusIcon("pending")}
                                        To Do
                                    </div>
                                </SelectItem>
                                <SelectItem value="in-progress">
                                    <div className="flex items-center">
                                        {getStatusIcon("in-progress")}
                                        In Progress
                                    </div>
                                </SelectItem>
                                <SelectItem value="completed">
                                    <div className="flex items-center">
                                        {getStatusIcon("completed")}
                                        Completed
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {loading === "failed" && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>There was an error submitting the form. Please try again.</AlertDescription>
                        </Alert>
                    )}

                    <CustomDialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading === "pending"}>
                            {loading === "pending" ? "Submitting..." : task ? "Update Task" : "Create Task"}
                        </Button>
                    </CustomDialogFooter>
                </form>
            </CustomDialogContent>
        </CustomDialog>
    )
}
