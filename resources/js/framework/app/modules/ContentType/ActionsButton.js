import React from "react";
// elements
import Button from "@mui/material/Button";
// icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// layout
import { useCSS } from "../../hooks/css";

const ActionsButton = () => {
    const classes = useCSS();
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<EditIcon />}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
            >
                Delete
            </Button>
        </div>
    );
};

export default ActionsButton;