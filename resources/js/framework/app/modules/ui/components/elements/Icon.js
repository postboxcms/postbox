import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Icon = (props) => {
    const { name, size, color } = props;

    return <FontAwesomeIcon icon={"fas " + name} size={size} color={color} {...props} />;
};

export default Icon;