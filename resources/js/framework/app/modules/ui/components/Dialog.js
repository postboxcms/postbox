import React from "react";
import Title from "@ui/components/elements/Title";

export const Dialog = ({ open, content, handleClose, title, icon }) => {
    React.useEffect(() => {
        if (!open) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, handleClose]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={(event) => {
            if (event.target === event.currentTarget) handleClose();
        }}>
            <section role="dialog" aria-modal="true" aria-labelledby="modal-modal-title" className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-xl">
                <Title id="modal-modal-title" icon={icon}>{title}</Title>
                <div className="p-4 text-center">{content}</div>
            </section>
        </div>
    );
};

export default Dialog;