import React from "react";
import ClassicButton from "./ClassicButton";

export const SaveButton = (props) => {
    const { text = "Save" } = props;
    return (
        <ClassicButton icon="fa-bookmark" type="submit" {...props}>
            {text}
        </ClassicButton>
    );
};

export default SaveButton;
