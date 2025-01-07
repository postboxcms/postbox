import React from "react";
import { Container, Grid, Modal } from "@mui/material";
import { useCSS } from "@app/hooks";
import Title from "@ui/elements/Title";

export const Dialog = ({ open, content, handleClose, title }) => {
    const classes = useCSS();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={classes.modal}>
                <Title icon="fa-notes-medical">{title}</Title>
                <Container>
                    <Grid
                        alignContent={"center"}
                        alignSelf={"center"}
                        alignItems={"center"}
                        textAlign={"center"}
                    >{content}
                    </Grid>
                </Container>
            </div>
        </Modal>
    );
}

export default Dialog;