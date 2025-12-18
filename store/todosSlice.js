import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [
      { id: 1, title: "Apprendre Redux" },
      { id: 2, title: "Faire le TP Dev Mobile" },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

export const { addTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
