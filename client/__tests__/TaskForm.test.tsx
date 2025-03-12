"use client"

import { render, screen } from "@testing-library/react"
import TaskForm from '@/components/reusables/TaskForm'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe("TaskForm", () => {
    let store: any
    const mockOnSubmit = jest.fn()

    beforeEach(() => {
        store: mockStore({
            tasks: {
                loading: "idle",
                error: null
            }
        })
    })

    it("renders the form with empty values", () => {
        render(
            <Provider store={store}>
                <TaskForm onSubmit={mockOnSubmit} />
            </Provider>
        )

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /create task/i })).toBeInTheDocument()
    })
})
