import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import IOSSwitch from '@ui/elements/IOSSwitch';
import ImageUploader from '@ui/components/ImageUploader';
import { useCSS } from '@app/hooks';

export default function FormInput(props) {
    const classes = useCSS();
    const { type, required, value, onChange, placeholder, inputProps, rows = 4, name, fullWidth = true } = props;

    const generateHelperText = (text) => {
        return `Toggle the ${text}`;
    };

    const renderInput = () => {
        switch (type) {
            case 'text':
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
            case 'number':
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
            case 'date':
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
            case 'textarea':
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
            case 'radio':
                return (
                    <>
                    <IOSSwitch
                        name={name}
                        checked={value}
                        onChange={onChange}
                        inputProps={{ 'aria-label': placeholder, required }}
                        className={classes.radioSwitch}
                    />{' '}
                    <span>{generateHelperText(placeholder)}</span>
                    </>
                );
            case 'image':
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
    type: PropTypes.oneOf(['text', 'number', 'date']).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
};