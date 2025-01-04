import React from "react";

export const useModal = () => {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState(null);

    const handleOpen = (content) => {
        setContent(content);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        content,
        handleOpen,
        handleClose
    };
}