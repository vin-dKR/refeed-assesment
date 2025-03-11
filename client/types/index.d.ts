declare global {
    interface Task {
        _id: string
        title: string
        description: string
        status: "pending" | "in progress" | "completed"
    }

    interface TaskListProps {
        tasks: Task[]
    }

    interface TaskItemProps {
        task: Task
        onToggleComplete: (id: string) => void
        onEdit: (task: Task) => void
        onDelete: (id: string) => void
    }
}

export {}
