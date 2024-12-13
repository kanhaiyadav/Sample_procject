import { createSelector } from "@reduxjs/toolkit";

export const selectForm = (state) => state.form;

export const selectFormData = createSelector(selectForm, (form) => form.formData);
export const selectFormFocused = createSelector(selectForm, (form) => form.focused);
export const selectFormType = createSelector(selectForm, (form) => form.type);