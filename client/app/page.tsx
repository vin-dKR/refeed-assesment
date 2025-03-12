"use client"

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store"
import { fetchTasks } from "@/redux/features/tasks/taskThunk";
import { Progress } from "@/components/ui/progress";
import TaskBoard from "@/components/reusables/TaskBoard";
import TaskFormModal from "@/components/reusables/TaskFormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function Home() {
    const dispatch = useDispatch<AppDispatch>()
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks) 
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    if (loading === "pending") return <Progress />

    return (
        <div className="container mx-auto py-8 px-4 h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Task Manager</h1>
                <Button onClick={() => setIsFormModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Task
                </Button>
            </div>

            <TaskFormModal task={null} isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />
            <TaskBoard />

        </div>)
}
