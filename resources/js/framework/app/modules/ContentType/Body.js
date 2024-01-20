import React from "react";
import List from "./List";
import AddEdit from "./AddEdit";

const Body = (props) => {
    const [viewState, setViewState] = React.useState(true);
    if (viewState) {
        return <List {...props} setViewState={setViewState} />;
    } else {
        return <AddEdit {...props} setViewState={setViewState} />;
    }
};

export default Body;