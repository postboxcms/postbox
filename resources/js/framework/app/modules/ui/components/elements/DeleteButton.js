import React from "react";
import ClassicButton from "./ClassicButton";

export const DeleteButton = (props) => {
    const { text = "Delete" } = props;
    return (
        <ClassicButton color="error" icon="fa-trash" type="submit" {...props}>
            {text}
        </ClassicButton>
    );
};

export default DeleteButton;
