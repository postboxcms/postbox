import React from "react";

const Panel = (props) => {
    const { children, width, className = "", style, ...panelProps } = props;
    
    return (
        <section {...panelProps} style={{ width: width || '100%', ...style }} className={`mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${className}`}>
            {children}
        </section>
    );
}

export default Panel;