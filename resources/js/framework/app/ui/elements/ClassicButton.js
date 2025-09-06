import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCSS } from "@app/hooks/css";

export const ClassicButton = (props) => {
    const classes = useCSS();
    const { icon, color } = props;

    return (
        <Button
            size="medium"
            className={classes.primaryButton}
            {...props}
            variant="contained"
            color={color || "primary"}
            startIcon={<FontAwesomeIcon size="lg" icon={icon} />}
        >
            {props.children}
        </Button>
    );
};

export default ClassicButton;
