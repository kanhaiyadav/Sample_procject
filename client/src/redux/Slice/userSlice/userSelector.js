import { createSelector } from "@reduxjs/toolkit";

const selectUser = (state) => state.user;

export const selectUserDetails = createSelector([selectUser], (user) => user);