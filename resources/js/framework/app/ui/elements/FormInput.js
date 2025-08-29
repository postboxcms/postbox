import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IOSSwitch from "@ui/elements/IOSSwitch";
import ImageUploader from "@ui/components/ImageUploader";
import { useCSS } from "@app/hooks";

export default function FormInput(props) {
    const {
        type,
        required,
        value,
        onChange,
        placeholder,
        inputProps,
        rows = 4,
        name,
        fullWidth = true,
    } = props;
    const classes = useCSS();

    const updateField = (event) => {
        console.log("Updating field:", event.target.name, event.target.value);
        onChange(event);
    };

    const generateHelperText = (text) => {
        return `Toggle the ${text}`;
    };

    const renderInput = () => {
        switch (type) {
            case "text":
                return (
                    <TextField
                        name={name}
                        variant="outlined"
                        value={value}
                        onChange={updateField}
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        className={classes.formInput}
                        required={required}
                    />
                );
            case "number":
                return (
                    <TextField
                        name={name}
                        type="number"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        className={classes.formInput}
                        required={required}
                    />
                );
            case "date":
                return (
                    <TextField
                        name={name}
                        type="date"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        fullWidth={fullWidth}
                        className={classes.formInput}
                        required={required}
                    />
                );
            case "textarea":
                return (
                    <TextField
                        name={name}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        multiline
                        rows={rows}
                        className={classes.formInput}
                        required={required}
                    />
                );
            case "switch":
                return (
                    <>
                        <IOSSwitch
                            name={name}
                            checked={Boolean(value)}
                            onChange={onChange}
                            inputProps={{ "aria-label": placeholder, required }}
                            className={classes.radioSwitch}
                        />{" "}
                        <span>{generateHelperText(placeholder)}</span>
                    </>
                );
            case "radio":
                return (
                    <TextField
                        name={name}
                        type="radio"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        className={classes.formInput}
                        required={required}
                        inputProps={inputProps}
                    />
                );
            case "dropdown":
                return (
                    <Select
                        name={name}
                        value={value}
                        defaultValue=""
                        onChange={onChange}
                        displayEmpty
                        fullWidth={fullWidth}
                        className={classes.formInput}
                        required={required}
                        inputProps={inputProps}
                    >
                        <MenuItem key={0} value={""}>
                            Select {name}
                        </MenuItem>
                        {inputProps && inputProps.options
                            ? inputProps.options.map((option) => (
                                  <MenuItem
                                      key={option.value}
                                      value={option.value}
                                  >
                                      {option.value}
                                  </MenuItem>
                              ))
                            : null}
                    </Select>
                );
            case "image":
                return (
                    <ImageUploader
                        name={name}
                        placeholder={placeholder}
                        uploadImage={onChange}
                        inputProps={{ ...inputProps, required }}
                    />
                );
            default:
                return (
                    <TextField
                        name={name}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        className={classes.formInput}
                        required={required}
                    />
                );
        }
    };

    return renderInput();
}

FormInput.propTypes = {
    type: PropTypes.oneOf(["text", "number", "date"]).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
};
