import React from "react";
// elements
import IconButton from "@mui/material/IconButton";
// icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// layout
import { useCSS } from "../../../hooks/css";

const ActionsButton = () => {
    const classes = useCSS();
    return (
        <div>
            <IconButton
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
            ><EditIcon /></IconButton>
            <IconButton
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
            ><DeleteIcon /></IconButton>
        </div>
    );
};

export default ActionsButton;