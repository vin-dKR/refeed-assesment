declare global {
    interface Task {
        _id: string;
        title: string;
        description: string;
        status: "pending" | "in-progress" | "completed";
        createdAt: string; // ISO string format
        updatedAt?: string; // Optional, if you track updates
    }

    interface TaskListProps {
        tasks: Task[]
    }

    interface TaskState {
        tasks: Task[]
        filteredTasks: Task[],
        searchQuery: string,
        selectedTask: Task | null
        loading: "idle" | "pending" | "succeeded" | "failed"
        error: string | null
    }

    interface TaskColumnProps {
        title: string;
        tasks: Task[];
        onTaskClick: (task: Task) => void;
        onEditClick: (task: Task) => void;
    }

    interface TaskItemProps {
        task: Task;
        onClick: () => void;
        onEditClick: () => void;
    }

    interface TaskDetailModalProps {
        task: Task;
        isOpen: boolean;
        onClose: () => void;
        onEditClick: () => void;
    }

    interface TaskFormModalProps {
        task: Task | null
        isOpen: boolean
        onClose: () => void
    }

    interface TaskFormProps {
        onSubmit: (data: TaskFormData) => void;
        initialValues?: Task;
    }

    interface TaskFormData {
        title: string;
        description: string;
        status: string;
    }

    interface TaskFormProps {
        onSubmit: (data: TaskFormData) => void;
        initialValues?: Task;
    }
}

export {}
