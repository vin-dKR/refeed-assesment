import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTask, deleteTask, fetchTasks, updateTask } from './taskThunk';
import { RootState } from '@/redux/store';

interface TasksState {
  entities: { [id: string]: Task };
  ids: string[];
  searchQuery: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  entities: {},
  ids: [],
  searchQuery: '',
  loading: 'idle',
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // Normalize the tasks array into an entities object
        state.entities = {};
        state.ids = [];
        action.payload.forEach((task) => {
          state.entities[task._id] = task;
          state.ids.push(task._id);
        });
      })
      // Create task
      .addCase(addTask.fulfilled, (state, action) => {
        const task = action.payload;
        state.entities[task._id] = task;
        state.ids.push(task._id);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = action.payload;
        // Only update the specific task that changed
        if (state.entities[task._id]) {
          state.entities[task._id] = task;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;
        delete state.entities[id];
        state.ids = state.ids.filter(taskId => taskId !== id);
      });
  },
});

export const { setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;

// Add selectors
export const selectTaskIds = (state: RootState) => state.tasks.ids;
export const selectTaskEntities = (state: RootState) => state.tasks.entities;
