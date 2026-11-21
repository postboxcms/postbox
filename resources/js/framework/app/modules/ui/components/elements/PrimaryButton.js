import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWebCSS } from "@ui/hooks/css";

export const PrimaryButton = (props) => {
    const classes = useWebCSS();
    const { icon, className = "", children, ...buttonProps } = props;
    
    return (
        <button {...buttonProps} className={`${classes.primaryButton} ${className}`}>
            {icon && <FontAwesomeIcon size="lg" icon={icon} />}
            {children}
        </button>
    );
}

export default PrimaryButton;