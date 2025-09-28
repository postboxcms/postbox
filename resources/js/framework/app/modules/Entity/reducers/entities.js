import { createSlice } from "@reduxjs/toolkit";

const entities = createSlice({
    name: "entities",
    initialState: {
        types: [],
        details: "",
        status: "idle"
    },
    reducers: {
        loadEntities: (state) => {
            state.status = "pending";
        },
        loadEntity: (state) => {
            state.status = "pending";
        },
        setEntity: (state, action) => {
            state.details = action.payload;
        },
        setEntities: (state, action) => {
            state.types = action.payload;
        }
    }
});

export const getEntities = (state) => state.entities.types;
export const getEntity = (state) => state.entities.details;
export const { setEntities, setEntity, loadEntities, loadEntity } = entities.actions;

export default entities.reducer;