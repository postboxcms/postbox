import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { useCSS } from '@app/hooks';

export default function FormInput({ type, value, onChange, placeholder, fullWidth = true }) {
    const classes = useCSS();

    const renderInput = () => {
        switch (type) {
            case 'text':
                return (
                    <TextField
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
                        type="date"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        fullWidth={fullWidth}
                        className={classes.formInput}
                    />
                );
            default:
                return (
                    <TextField
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