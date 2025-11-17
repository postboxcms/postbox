import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = (props) => {
    const { name, size, color } = props;

    return <FontAwesomeIcon icon={"fas " + name} style={{fontSize: size}} size={size} color={color} {...props} />;
};

export default Icon;