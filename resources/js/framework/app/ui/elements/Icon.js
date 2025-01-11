import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = (props) => {
    const { name, size, color } = props;

    return <FontAwesomeIcon icon={"fas " + name} size={size} color={color} />;
};

export default Icon;