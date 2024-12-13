import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    focused: false,
    type: "add",
    formData: {
        _id: "temp",
        task: "",
        date: new Date().toISOString().split("T")[0],
        time: "00:00",
        tags: [],
        tag: "",
    },
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setForm: (state, action) => {
            state.formData = { ...initialState.formData, ...action.payload };
        },
        resetForm: (state) => {
            state.formData = { ...initialState.formData };
        },
        closeForm: (state) => {
            state.focused = false;
            state.formData = { ...initialState.formData };
        },
        setFormType: (state, action) => {
            state.type = action.payload;
        }, 
        openForm: (state) => {
            state.focused = true;
        },
    },
});

export const { setForm, resetForm, closeForm, setFormType, openForm } = formSlice.actions;
export default formSlice.reducer;
