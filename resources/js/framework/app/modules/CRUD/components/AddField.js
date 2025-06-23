import React from "react";
import { Grid } from "@mui/material";
import { useNotifier, useCMSRoute, useSecureRoute } from "@app/hooks";
import Form from "@ui/components/Form";
import SaveButton from "@ui/elements/SaveButton";
import Input from "@ui/elements/Input";
import { fetchEntries, pushToObject } from "@app/utils";

export const AddField = (props) => {
    const notify = useNotifier();
    const cms = useCMSRoute();
    const api = useSecureRoute();
    const [field, setField] = React.useState("");
    const [isFormDisabled, setIsFormDisabled] = React.useState(false);

    const updatePayload = (data, replaceKeys, newEntries) => {
        for (const [key, newKey] of fetchEntries(replaceKeys)) {
            data[newKey] = data[key];
            delete data[key];
        }
        pushToObject(data, newEntries);
        return data;
    };

    const saveField = (event) => {
        try {
            event.preventDefault();
            const data = new FormData();
            for (const [key, value] of new FormData(event.target)) {
                data.append(key, value);
                if (key == "alias") {
                    data.append(
                        "field",
                        value.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()
                    );
                }
                if (key == "type") {
                    const list = props.typeList.find(
                        (item) => item.value == value
                    );
                    data.append("dataType", list.dataType);
                }
            }

            cms.post("/dbo/" + props.table, data).then((response) => {
                // insert into CRUD table as well
                const crudPayload = updatePayload(
                    response?.data?.data,
                    {
                        editPosition: "position",
                        view: "list",
                    },
                    { 
                        table: props.table 
                    }
                );

                api.post("/crud", crudPayload).then((response) => {
                    notify("Field added successfully");
                    props.onClose();
                });
            });
        } catch (error) {
            console.error(error);
            notify("Something went wrong!", "error");
        }
    };

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
                        onChange={(e) => {
                            setField(
                                e.target.value
                                    .replace(/[^a-zA-Z0-9]/g, "_")
                                    .toLowerCase()
                            );
                            setIsFormDisabled(e.target.value.length > 2);
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <Input
                        defaultValue="text"
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
                        defaultValue={1}
                        type="dropdown"
                        name="view"
                        fullWidth
                        label="View In List"
                        options={[
                            { value: 1, label: "Yes" },
                            { value: 0, label: "No" },
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
};

export default AddField;
