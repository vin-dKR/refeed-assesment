import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TaskList({ tasks }: TaskListProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            case "in-progress":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200"
            case "completed":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No tasks found. Create a new task to get started.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <Link href={`/tasks/${task._id}`} key={task._id}>
                    <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <h3 className="font-medium leading-tight line-clamp-1">{task.title}</h3>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
