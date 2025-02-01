import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";
import { useCSS } from "@app/hooks/css";
import Icon from "./Icon";

const IconButton = (props) => {
    const classes = useCSS();
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
