import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import IOSSwitch from '@ui/elements/IOSSwitch';
import ImageUploader from '@ui/components/ImageUploader';
import { useCSS } from '@app/hooks';

export default function FormInput(props) {
    const classes = useCSS();
    const { type, value, onChange, placeholder, rows = 4, name, fullWidth = true } = props;

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
                    />
                );
            case 'radio':
                return (
                    <>
                    <IOSSwitch
                        name={name}
                        checked={value}
                        onChange={onChange}
                        inputProps={{ 'aria-label': placeholder }}
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
};