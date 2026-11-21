import React from "react";
import { useWebCSS } from "@ui/hooks/css";
import Icon from "./Icon";

const IconButton = (props) => {
    const classes = useWebCSS();
    const { color, size, className = "", ...buttonProps } = props;

    return (
        <button
            type="button"
            {...buttonProps}
            className={`${classes.button} app-primary-text rounded p-2 hover:bg-slate-100 ${className}`}
        >
            <Icon {...props} />
        </button>
    );
};

export default IconButton;
