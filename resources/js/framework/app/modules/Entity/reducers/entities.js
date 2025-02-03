import { createSlice } from "@reduxjs/toolkit";

const entities = createSlice({
    name: "entities",
    initialState: {
        types: []
    },
    reducers: {
        setEntities: (state, action) => {
            state.types = action.payload;
        }
    }
});

export const getEntities = (state) => state.entities.types;
export const { setEntities } = entities.actions;

export default entities.reducer;