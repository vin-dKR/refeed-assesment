declare global {
    interface Task {
        _id: string
        title: string
        description: string
        status: "pending" | "in-progress" | "completed"
    }

    interface TaskListProps {
        tasks: Task[]
    }

    interface TaskState {
        tasks: Task[]
        selectedTask: Task | null
        loading: "idle" | "pending" | "succeeded" | "failed"
        error: string | null
    }

   interface TaskColumnProps {
        title: string
        tasks: Task[]
        onTaskClick: (task: Task) => void
        onEditClick: (task: Task) => void
    }

    interface SortableTaskItemProps {
        task: Task
        onClick: () => void
        onEditClick: () => void
    }

    interface TaskItemProps {
        task: Task
        onClick: () => void
        onEditClick: () => void
    }

    interface TaskDetailModalProps {
        task: Task
        isOpen: boolean
        onClose: () => void
        onEditClick: () => void
    }

    interface TaskFormModalProps {
        task: Task | null
        isOpen: boolean
        onClose: () => void
    }

    interface TaskFormProps {
        onSubmit: (data: { title: string; description: string; status: string }) => void
        initialValues?: {
            title: string,
            description: string,
            status: string
        }
    }
}

export {}
