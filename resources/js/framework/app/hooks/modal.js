import React from "react";

export const useModal = () => {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState(null);
    const [title, setTitle] = React.useState(null);
    const [icon, setIcon] = React.useState(null);


    const handleOpen = (content, title, icon) => {
        setContent(content);
        setTitle(title);
        setIcon(icon);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        content,
        title,
        icon,
        handleOpen,
        handleClose
    };
}