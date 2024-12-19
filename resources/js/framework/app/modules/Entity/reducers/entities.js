import { createSlice } from "@reduxjs/toolkit";

const entities = createSlice({
    name: "entities",
    initialState: {
        types: []
    },
    reducers: {
        setEntitys: (state, action) => {
            state.types = action.payload;
        }
    }
});

export const getEntitys = (state) => state.entities.types;
export const { setEntitys } = entities.actions;

export default entities.reducer;