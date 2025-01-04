import React from "react";
import { Modal } from "@mui/material";
import { useCSS } from "@app/hooks";

export const BoxModal = ({ open, content, handleClose }) => {
    const classes = useCSS();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={classes.modal}>{content}</div>
        </Modal>
    );
}

export default BoxModal;