import React from "react";
import { MenuItem, Select, TextField } from "@mui/material";

export const Input = (props) => {
    const { type, options, inputProps } = props;
    switch (type) {
        case "text":
            return <TextField size="small" variant="outlined" {...props} />;
        case "adornedText":
            return (
                <TextField
                    size="small"
                    variant="outlined"
                    InputProps={{
                        startAdornment: inputProps?.startAdornment
                    }}
                    {...props}
                />
            );
        case "dropdown":
            return (
                <TextField select variant="outlined" size="small" {...props}>
                    {options.map((option) => (
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