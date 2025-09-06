import React from "react";
import { Grid, Typography } from "@mui/material";
import { useNotifier, useSecureRoute } from "@app/hooks";
import Form from "@ui/components/Form";
import DeleteButton from "@ui/elements/DeleteButton";

export const DeleteEntity = (props) => {
    const notify = useNotifier();
    const api = useSecureRoute();
    const { onClose } = props;

    const deleteEntity = (e) => {
        try {
            e.preventDefault();
            const {
                data: { module, entity },
            } = props;
            api.remove(`/entity/${module}`, {
                uuid: entity?.row?.uuid,
                module: module,
            }).then(() => {
                notify("Entity deleted successfully");
                onClose();
            });
        } catch (error) {
            console.error(error);
            notify("Something went wrong!", "error");
        }
    };

    return (
        <Form onSubmit={deleteEntity}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Are you sure you want to delete this record?
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={8} sm={8}></Grid>
                <Grid item xs={4} sm={4}>
                    <DeleteButton fullWidth />
                </Grid>
            </Grid>
        </Form>
    );
};

export default DeleteEntity;
