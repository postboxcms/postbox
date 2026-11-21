import React from "react";
import { useNotifier, useSecureRoute } from "@app/hooks";
import Form from "@ui/components/Form";
import DeleteButton from "@ui/components/elements/DeleteButton";
import Grid from "@ui/components/elements/Grid";

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
                    <p className="mb-2 text-lg font-semibold text-slate-800">
                        Are you sure you want to delete this record?
                    </p>
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
