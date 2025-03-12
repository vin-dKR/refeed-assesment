import React from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorDisplayProps {
    message: string
}

export default function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
        <div className="container mx-auto py-8 px-4">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </div>
    )
}


