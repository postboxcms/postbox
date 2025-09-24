import { createSlice } from "@reduxjs/toolkit";

const entities = createSlice({
    name: "entities",
    initialState: {
        types: [],
        status: "idle"
    },
    reducers: {
        loadEntities: (state) => {
            state.status = "pending";
        },
        setEntities: (state, action) => {
            state.types = action.payload;
        }
    }
});

export const getEntities = (state) => state.entities.types;
export const { setEntities, loadEntities } = entities.actions;

export default entities.reducer;