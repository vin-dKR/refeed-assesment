"use client"

import React, { FormEvent, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Alert, AlertDescription } from "../ui/alert"
import { AlertCircle } from "lucide-react"

export default function TaskForm({onSubmit,initialValues}: TaskFormProps) {
    const [title, setTitle] = useState(initialValues?.title || "")
    const [description, setDescription] = useState(initialValues?.description || "")
    const [status, setStatus] = useState(initialValues?.status || "pending")
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({})

    const { loading } = useSelector((state: RootState) => state.tasks)
    const isSubmitting = loading === "pending"

    const validate = () => {
        const newErrors: { title?: string, description?: string } = {}

        if (!title.trim()) {
            newErrors.title = "Title is required!"
        }

        if (!description.trim()) {
            newErrors.title = "Description is required!"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (validate()) {
            onSubmit({
                title: title.trim(),
                description: description.trim(),
                status
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title here please"
                    disabled={isSubmitting}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description here please"
                    disabled={isSubmitting}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus} disabled={isSubmitting} >
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading === "failed" && (
                <Alert variant={"destructive"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>There was an error submitting the form. Please try again.</AlertDescription>
                </Alert>
            )}
        </form>
    )
}
