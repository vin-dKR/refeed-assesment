"use client"

import React, { useState, useEffect } from "react"
import { CustomDialog, CustomDialogContent, CustomDialogHeader, CustomDialogTitle, CustomDialogFooter } from "@/components/ui/custom-dialog"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { updateTask } from "@/redux/features/tasks/taskThunk"
import TaskForm from "../TaskForm"

interface EditTaskModalProps {
    task: Task | null
    isOpen: boolean
    onClose: () => void
}

export default function EditTaskModal({ task, isOpen, onClose }: EditTaskModalProps) {
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.tasks)
    const isSubmitting = loading === "pending"

    const handleSubmit = async (formData: { title: string; description: string; status: string }) => {
        if (!task) return

        await dispatch(
            updateTask({
                id: task._id,
                title: formData.title,
                description: formData.description,
                status: formData.status,
            })
        )

        // Close the modal if the update was successful
        if (loading !== "failed") {
            onClose()
        }
    }

    if (!task) return null

    return (
        <CustomDialog open={isOpen} onOpenChange={onClose}>
            <CustomDialogContent className="sm:max-w-lg">
                <CustomDialogHeader>
                    <CustomDialogTitle>Edit Task</CustomDialogTitle>
                </CustomDialogHeader>

                <TaskForm 
                    onSubmit={handleSubmit} 
                    initialValues={task} 
                />

                <CustomDialogFooter className="mt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        onClick={() => {
                            const form = document.querySelector('form')
                            if (form) {
                                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
                            }
                        }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </CustomDialogFooter>
            </CustomDialogContent>
        </CustomDialog>
    )
}
