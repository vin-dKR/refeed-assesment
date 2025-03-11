import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskList from "@/components/reusables/TaskList";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store"
import { useSelector } from "react-redux";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>()
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks) 
    return (
        <div className="container mx-auto py-8 px-4 sm:w-3/5 w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Task Manager</h1>
                <Link href="/tasks/new">
                    <Button className="bg-black text-white dark:bg-white dark:text-black">
                        <Plus className="text-white dark:text-black mr-2 h-4 w-4" />
                        New Task
                    </Button>
                </Link>
            </div>
        </div>
    )
}
