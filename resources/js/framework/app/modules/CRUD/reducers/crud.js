import { createSlice } from "@reduxjs/toolkit";

const crud = createSlice({
    name: "crud",
    initialState: {
        status: "idle",
        data: []
    },
    reducers: {
        loadCRUD: (state) => {
            state.status = "pending";
        },
        setCRUD: (state, action) => {
            state.data = action.payload;
            state.status = "fulfilled";
        }
    }
});

export const getCRUD = (state) => state.crud.data;
export const { setCRUD, loadCRUD } = crud.actions;

export default crud.reducer;