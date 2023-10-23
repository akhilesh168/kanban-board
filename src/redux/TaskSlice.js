import { createSlice } from '@reduxjs/toolkit';
import { DefaultCards } from '../utils/constants';
import { createKeysObject } from '../utils/helperMethods';

const initialState = {
  tasks: createKeysObject(DefaultCards),
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    onResetState: (state, action) => {
      state = initialState;
    },
    addNewCard: (state, action) => {
      state.tasks[action.payload] = [];
    },
    deleteCard: (state, action) => {
      delete state.tasks[action.payload];
    },
    addNewTask: (state, action) => {
      state.tasks['UnAssigned'].push(action?.payload);
    },
    markTaskAsFavorite: (state, action) => {
      state.tasks[action.payload.container][action.payload.index].isFavorite =
        !state.tasks[action.payload.container][action.payload.index].isFavorite;
    },
    sortTaskAlphabeticalWithFavorite: (state, action) => {
      const favorite = state.tasks[action.payload.container].filter(
        (item) => item.isFavorite
      );
      const notFavorite = state.tasks[action.payload.container]
        .filter((item) => !item.isFavorite)
        .sort((a, b) => a?.name.localeCompare(b?.name));
      state.tasks[action.payload.container] = [...favorite, ...notFavorite];
    },
    deleteTask: (state, action) => {
      let result = state.tasks[action.payload.container].filter(
        (item) => item?.name !== action?.payload?.name
      );
      state.tasks[action.payload.container] = result;
    },
    moveTask: (state, action) => {
      let containerResult = state.tasks[action?.payload?.container].findIndex(
        (item) => item.name === action?.payload?.unAssignedItem.name
      );
      let parentResult = state.tasks[action?.payload?.parent].filter(
        (item) => item.name !== action.payload?.unAssignedItem.name
      );
      if (containerResult === -1) {
        state.tasks[action.payload.container].push(
          action.payload.unAssignedItem
        );
        state.tasks[action.payload.parent] = parentResult;
      }
    },
    updateTask: (state, action) => {
      let containerResult = state.tasks[
        action.payload?.state?.cardTitle
      ].findIndex((item) => item.name === action.payload.task.name);
      if (containerResult >= 0) {
        state.tasks[action.payload?.state?.cardTitle][containerResult] =
          action.payload.task;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewCard,
  updateCardName,
  deleteCard,
  addNewTask,
  sortTaskAlphabeticalWithFavorite,
  updateTask,
  deleteTask,
  moveTask,
  markTaskAsFavorite,
  onResetState,
} = tasksSlice.actions;

export default tasksSlice.reducer;
