import React from "react";
import PrimaryButton from "./PrimaryButton";

export const SaveButton = (props) => {
    return (
        <PrimaryButton 
            icon="fa-bookmark" 
            type="submit" { ...props}>Save</PrimaryButton>
    );
}

export default SaveButton;