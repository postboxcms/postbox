import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Radio, Select, TextField, MenuItem } from "@mui/material";
import IOSSwitch from "@ui/elements/IOSSwitch";
import ImageUploader from "@ui/components/ImageUploader";
import { useCSS } from "@app/hooks";

export default function FormInput(props) {
    const {
        type,
        required,
        value,
        checked,
        onChange,
        placeholder,
        inputProps,
        rows = 4,
        name,
        label = "",
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
                    <div className={classes.formOptions}>
                        <Radio
                            name={name}
                            checked={checked}
                            onChange={onChange}
                            color="primary"
                            required={required}
                            inputProps={inputProps}
                        />
                        <span className="label">{label}</span>
                    </div>
                );
            case "dropdown":
                return (
                    <Select
                        name={name}
                        value={value}
                        onChange={onChange}
                        fullWidth={fullWidth}
                        className={classes.formInput}
                        required={required}
                        inputProps={inputProps}
                        key={value} // Force re-mount when value changes
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
                                      {option.label || option.value}
                                  </MenuItem>
                              ))
                            : null}
                    </Select>
                );
            case "checkbox":
                return (
                    <div className={classes.formOptions}>
                        <Checkbox
                            name={name}
                            checked={checked}
                            onChange={onChange}
                            color="primary"
                            required={required}
                            inputProps={inputProps}
                        />{" "}
                        <span className="label">{label}</span>
                    </div>
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
    type: PropTypes.oneOf(["text", "number", "date", "dropdown"]).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
};
