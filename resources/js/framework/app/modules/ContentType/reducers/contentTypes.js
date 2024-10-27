import { createSlice } from "@reduxjs/toolkit";

const contentTypes = createSlice({
    name: "contentTypes",
    initialState: {
        types: []
    },
    reducers: {
        setContentTypes: (state, action) => {
            state.types = action.payload;
        }
    }
});

export const getContentTypes = (state) => state.contentTypes.types;
export const { setContentTypes } = contentTypes.actions;

export default contentTypes.reducer;