import React from "react";
import ClassicButton from "./ClassicButton";

export const SaveButton = (props) => {
    return (
        <ClassicButton 
            icon="fa-bookmark" 
            type="submit" { ...props}>Save</ClassicButton>
    );
}

export default SaveButton;