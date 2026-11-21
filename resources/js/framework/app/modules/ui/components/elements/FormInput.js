import React from "react";
import PropTypes from "prop-types";
import IOSSwitch from "@ui/components/elements/IOSSwitch";
import ImageUploader from "@ui/components/ImageUploader";
import { useWebCSS } from "@app/hooks";

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
    const classes = useWebCSS();

    const updateField = (event) => {
        console.log("Updating field:", event.target.name, event.target.value);
        onChange(event);
    };

    const generateHelperText = (text) => {
        return `Toggle the ${text}`;
    };

    const renderInput = () => {
        const { options, ...selectProps } = inputProps || {};
        const commonProps = {
            name,
            value: value ?? "",
            onChange,
            placeholder,
            required,
            className: `${classes.formInput} ${fullWidth ? 'w-full' : 'w-auto'}`,
        };
        switch (type) {
            case "text":
                return <input {...commonProps} onChange={updateField} type="text" />;
            case "number":
                return <input {...commonProps} type="number" />;
            case "date":
                return <input {...commonProps} type="date" />;
            case "textarea":
                return (
                    <textarea {...commonProps} rows={rows} />
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
                        <input
                            type="radio"
                            name={name}
                            checked={checked}
                            onChange={onChange}
                            required={required}
                            {...inputProps}
                            className="app-primary-checkbox h-4 w-4"
                        />
                        <span className="label">{label}</span>
                    </div>
                );
            case "dropdown":
                return (
                    <select
                        name={name}
                        value={value ?? ""}
                        onChange={onChange}
                        className={classes.formInput}
                        required={required}
                        {...selectProps}
                    >
                        <option value="">
                            Select {name}
                        </option>
                        {options
                            ? options.map((option) => (
                                  <option
                                      key={option.value}
                                      value={option.value}
                                  >
                                      {option.label || option.value}
                                  </option>
                              ))
                            : null}
                    </select>
                );
            case "checkbox":
                return (
                    <div className={classes.formOptions}>
                        <input
                            type="checkbox"
                            name={name}
                            checked={checked}
                            onChange={onChange}
                            required={required}
                            {...inputProps}
                            className="app-primary-checkbox h-4 w-4"
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
                    <input {...commonProps} type="text" />
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
