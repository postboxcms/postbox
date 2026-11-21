import React from "react";

export const Input = (props) => {
    const {
        type,
        options = [],
        inputProps,
        className = "",
        fullWidth = true,
        label,
        variant,
        size,
        ...inputPropsRest
    } = props;
    const { value, defaultValue, ...inputAttributes } = inputPropsRest;
    const formValue = value !== undefined ? { value } : { defaultValue };
    const classes = `app-primary-focus ${fullWidth ? "w-full" : "w-auto"} rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 ${className}`;
    switch (type) {
        case "text":
            return <input {...inputAttributes} {...formValue} className={classes} type="text" />;
        case "adornedText":
            return (
                <div className="app-primary-focus flex items-center rounded-md border border-slate-300 px-3 focus-within:ring-2">
                    {inputProps?.startAdornment}
                    <input {...inputAttributes} {...formValue} className="w-full border-0 bg-transparent px-2 py-2 text-sm outline-none" />
                </div>
            );
        case "dropdown":
            return (
                <select {...inputAttributes} value={value ?? defaultValue ?? ""} className={classes}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        default:
            return <input {...inputAttributes} {...formValue} className={classes} />;
    }
}

export default Input;