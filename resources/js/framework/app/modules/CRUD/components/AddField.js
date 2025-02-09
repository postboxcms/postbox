import React from "react";
import { Grid } from "@mui/material";
import { useNotifier, useCMSRoute } from "@app/hooks";
import Form from "@ui/components/Form";
import SaveButton from "@ui/elements/SaveButton";
import Input from "@ui/elements/Input";

export const AddField = (props) => {
    const notify = useNotifier();
    const cms = useCMSRoute();
    const [field, setField] = React.useState("");
    const [isFormDisabled, setIsFormDisabled] = React.useState(false);

    const saveField = (event) => {
        try {
            event.preventDefault();
            const data = new FormData();
            for (const [key, value] of new FormData(event.target)) {
                data.append(key, value);
                if(key == 'alias') {
                    data.append('field', value.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase());
                }
            }
            cms.post('/dbo/'+props.endpoint, data).then((response) => {
                console.log(response);
                notify("Field added successfully");
                props.onClose();    
            });
        } catch (error) {
            console.error(error);
            notify("Something went wrong!", "error");
        }
    }

    return (
        <Form onSubmit={saveField}>
            <Grid container spacing={2} marginBottom={2}>
                {/* Column for labels */}
                <Grid item xs={6} sm={6}>
                    <Input
                        name="field"
                        fullWidth
                        value={field}
                        label="Field"
                        disabled
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Input
                        name="alias"
                        fullWidth
                        defaultValue={""}
                        label="Alias"
                        onChange={
                            (e) =>  {
                                setField(e.target.value.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase());
                                setIsFormDisabled(e.target.value.length > 2);
                            }
                        }
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <Input
                        defaultValue="hidden"
                        type="dropdown"
                        name="type"
                        fullWidth
                        label="Type"
                        options={props.typeList}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <Input
                        defaultValue="yes"
                        type="dropdown"
                        name="view"
                        fullWidth
                        label="View In List"
                        options={[
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                        ]}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <Input
                        defaultValue="none"
                        type="dropdown"
                        name="editPosition"
                        fullWidth
                        label="Edit Page Position"
                        options={props.positionList}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <SaveButton disabled={!isFormDisabled} fullWidth />
                </Grid>
            </Grid>
        </Form>
    );
}

export default AddField;