import { createSelector } from "@reduxjs/toolkit";

const selectTodo = (state) => state.todo;

export const selectTodos = createSelector([selectTodo], (todo) => todo.todos);