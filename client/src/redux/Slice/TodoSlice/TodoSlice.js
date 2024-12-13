import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    async (userId, { rejectWithValue }) => {
        const response = await fetch(
            `http://localhost:3000/api/todo/fetch/${userId}`
        );
        const result = await response.json();
        if (response.ok) {
            return result;
        } else rejectWithValue(result);
        return await response.json();
    }
);

export const createTodo = createAsyncThunk(
    "todo/createTodo",
    async (data, { rejectWithValue }) => {
        try {
            const responce = await fetch("http://localhost:3000/api/todo/add", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const result = await responce.json();
            if (responce.ok) {
                console.log(result);
                return result;
            } else {
                rejectWithValue(result);
            }
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/todo/delete?id=${data.id}&userId=${data.userId}`,
                {
                    method: "DELETE",
                }
            );
            const result = await response.json();
            if (response.ok) {
                console.log(result);
                return result;
            } else {
                rejectWithValue(result);
            }
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const updateTodo = createAsyncThunk(
    "todo/updateTodo",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/todo/update`,
                {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            const result = await response.json();
            if (response.ok) {
                return result;
            } else {
                rejectWithValue(result);
            }
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },
        updateLocalTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo._id === action.payload._id ? action.payload : todo
            );
        },
        deleteLocalTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo._id !== action.payload
            );
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
        });
        builder.addCase(createTodo.fulfilled, (state, action) => {
            state.todos = state.todos.filter((todo) => todo._id !== "temp");
            state.todos.push(action.payload);
        });
    },
});

export const { addTodo, removeTodo, updateLocalTodo, deleteLocalTodo } = todoSlice.actions;
export default todoSlice.reducer;
