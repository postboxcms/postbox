import React from 'react';

export const IOSSwitch = ({ className = '', inputProps = {}, ...props }) => (
    <label className={`relative inline-flex h-5 w-9 cursor-pointer items-center ${className}`}>
        <input
            {...props}
            {...inputProps}
            type="checkbox"
            className="peer sr-only"
        />
        <span className="app-primary-switch absolute inset-0 rounded-full bg-slate-300 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50" />
        <span className="relative ml-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
    </label>
);

export default IOSSwitch;