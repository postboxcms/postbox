import React from "react";
import { MenuItem, Select, TextField } from "@mui/material";

export const Input = (props) => {
    switch (props.type) {
        case "text":
            return <TextField size="small" variant="outlined" {...props} />;
        case "dropdown":
            return (
                <TextField select variant="outlined" size="small" {...props}>
                    {props.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>);
        default:
            return <TextField size="small" variant="outlined" {...props} />;
    }
}

export default Input;