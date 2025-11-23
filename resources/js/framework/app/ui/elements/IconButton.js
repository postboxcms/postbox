import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";
import { useWebCSS } from "@app/hooks/css";
import Icon from "./Icon";

const IconButton = (props) => {
    const classes = useWebCSS();
    const { color, size } = props;

    return (
        <MuiIconButton
            variant="contained"
            color={color || "primary"}
            size={size || "medium" }
            className={classes.button}
            { ...props }
        >
            <Icon {...props} />
        </MuiIconButton>
    );
};

export default IconButton;
