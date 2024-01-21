import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
    name: "route",
    initialState: {
        pathname: null
    },
    reducers: {
        setRoute: (state, action) => {
            state.pathname = action.payload;
        }
    }
});

export const getRoute = (state) => state.route.pathname;
export const { setRoute } = routeSlice.actions;
export default routeSlice.reducer;