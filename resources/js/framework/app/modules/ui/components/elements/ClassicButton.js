import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWebCSS } from "@ui/hooks/css";

export const ClassicButton = (props) => {
    const classes = useWebCSS();
    const { icon, color, fullWidth, sx, className = "", children, ...buttonProps } = props;

    return (
        <button
            {...buttonProps}
            className={`${classes.primaryButton} ${fullWidth ? "w-full" : ""} ${className}`}
        >
            {icon && <FontAwesomeIcon size="lg" icon={icon} />}
            {children}
        </button>
    );
};

export default ClassicButton;
