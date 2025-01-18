import React from "react";
import { Grid, Typography } from "@mui/material";
import { useNotifier, useCMSRoute } from "@app/hooks";
import Form from "@ui/components/Form";
import SaveButton from "@ui/elements/SaveButton";

export const DeleteField = (props) => {
    const notify = useNotifier();
    const cms = useCMSRoute();

    const deleteField = (e) => {
        try {
            e.preventDefault();
            const data = {};
            cms.remove('/dbo', data).then((response) => {
                console.log(response);
                notify("Field deleted successfully");
                props.onClose();    
            });
        } catch (error) {
            console.error(error);
            notify("Something went wrong!", "error");
        }
    };

    return (
        <Form onSubmit={deleteField}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        Are you sure you want to delete this field?
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={8} sm={8}>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <SaveButton fullWidth />
                </Grid>
            </Grid>
        </Form>
    );
};

export default DeleteField;
