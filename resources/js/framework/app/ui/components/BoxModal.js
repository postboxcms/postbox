import React from "react";
import { Modal } from "@mui/material";
import { useCSS } from "@app/hooks";

export const BoxModal = ({ open, content, handleClose, title }) => {
    const classes = useCSS();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={classes.modal}>
                <h2 id="modal-modal-title">{title}</h2>
                <div id="modal-modal-description" className={classes.body}>
                    {content}
                </div>
            </div>
        </Modal>
    );
}

export default BoxModal;