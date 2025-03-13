// selectors.ts
import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';
import { selectTaskIds, selectTaskEntities } from '@/redux/features/tasks/taskSlice';

// Convert normalized state back to an array when needed
export const selectAllTasks = createSelector(
  [selectTaskIds, selectTaskEntities],
  (ids, entities) => ids.map(id => entities[id])
);

export const getPendingTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter(task => task.status === "pending")
);

export const getInProgressTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter(task => task.status === "in-progress")
);

export const getCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter(task => task.status === "completed")
);

export const getTaskById = (id: string) => createSelector(
  [selectTaskEntities],
  (entities) => entities[id]
);

export const getFilteredTasks = createSelector(
  [selectAllTasks, (state: RootState) => state.tasks.searchQuery],
  (tasks, searchQuery) => 
    searchQuery
      ? tasks.filter(task => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : []
);
