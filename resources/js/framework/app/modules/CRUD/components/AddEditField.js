import React from "react";
import { forEach, get, isEmpty } from "lodash";
import { Grid } from "@mui/material";
import { useNotifier, useCMSRoute, useSecureRoute } from "@app/hooks";
import Form from "@ui/components/Form";
import SaveButton from "@ui/elements/SaveButton";
import Input from "@ui/elements/Input";
import { fetchEntries, pushToObject } from "@app/utils";

export const AddEditField = (props) => {
    const { row } = props;
    const notify = useNotifier();
    const cms = useCMSRoute();
    const api = useSecureRoute();
    const [field, setField] = React.useState("");
    const [optionTypeSelected, setOptionTypeSelected] = React.useState(false);
    const [isFormEnabled, setIsFormEnabled] = React.useState(false);
    const htmlSelectors = ["dropdown", "radio", "checkbox"];

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

            let optionsData;
            let optionSelectors = [];
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
                    if (htmlSelectors.includes(value)) {
                        optionSelectors.push(value);
                    }
                    data.append("dataType", list.dataType);
                }

                if (key == "options" && !isEmpty(optionSelectors)) {
                    try {
                        if (!/^\s*\[\s*\{.*:.*\}\s*\]\s*$/.test(value)) {
                            notify(
                                'Options must match pattern [{"a":"b"}]',
                                "error"
                            );
                            return;
                        }
                        JSON.parse(value);
                        optionsData = value;
                        if (optionsData.length <= 0) {
                            notify("Options cannot be empty", "error");
                            return;
                        }
                        // data.delete(key);
                    } catch (e) {
                        console.error("JSON Exception:", e);
                        notify("Options must be a valid JSON", "error");
                        return;
                    }
                }
            }

            cms.post("/dbo/" + props.table, data)
                .then((response) => {
                    // insert into CRUD table as well
                    console.log("crud payload:", response);
                    const crudPayload = updatePayload(
                        response?.data?.data,
                        {
                            editPosition: "position",
                            view: "list",
                        },
                        {
                            table: props.table,
                        }
                    );

                    api.post("/crud", crudPayload).then((response) => {
                        // const optionsPayload = {
                        //     // check if optionsData is not empty, destructure it then loop over and generate payload
                        //     // fid: response.data?.fid,
                        //     // eid: response.data?.eid
                        // };

                        notify(response.data.message);
                        props.onClose();
                    });
                })
                .catch((error) => {
                    console.error("Exception:", error?.response?.data?.error);
                    if (
                        error?.response?.data?.error.includes(
                            "Column already exists"
                        )
                    ) {
                        notify(
                            "Duplicate column found. Please use a different alias",
                            "error"
                        );
                        return;
                    }
                    notify("Something went wrong! Please try again", "error");
                });
        } catch (error) {
            console.error(error);
            notify("Something went wrong! Please try again", "error");
        }
    };

    const getParam = (param, defaultValue = "") => {
        const parseToString = (obj) => {
            let newParam = "";
            forEach(obj, (obj) => {
                newParam += `{${obj.key}:${obj.value}},`;
            });
            return `[${newParam.slice(0, -1)}]`;
        };

        return row && Object.prototype.hasOwnProperty.call(row, param)
            ? typeof row[param] === "object"
                ? parseToString(row[param])
                : row[param]
            : defaultValue;
    };

    React.useEffect(() => {
        if (props.row && getParam("field")) {
            setIsFormEnabled(true);
        }
    }, [props.row]);

    return (
        <Form onSubmit={saveField}>
            <Grid container spacing={2} marginBottom={2}>
                {/* Column for labels */}
                <Grid item xs={6} sm={6}>
                    <Input
                        name="field"
                        fullWidth
                        value={field || getParam("field")}
                        label="Field"
                        disabled
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Input
                        name="alias"
                        fullWidth
                        defaultValue={getParam("alias")}
                        label="Alias"
                        onChange={(e) => {
                            setField(
                                e.target.value
                                    .replace(/[^a-zA-Z0-9]/g, "_")
                                    .toLowerCase()
                            );
                            setIsFormEnabled(e.target.value.length > 2);
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <Input
                        defaultValue={getParam("type", "text")}
                        type="dropdown"
                        name="type"
                        fullWidth
                        label="Type"
                        options={props.typeList}
                        onChange={(e) =>
                            htmlSelectors.includes(e.target.value)
                                ? setOptionTypeSelected(true)
                                : setOptionTypeSelected(false)
                        }
                    />
                </Grid>
            </Grid>
            <Grid
                container
                hidden={
                    !optionTypeSelected &&
                    !htmlSelectors.includes(getParam("type"))
                }
                spacing={2}
                marginBottom={2}
            >
                <Grid item xs={12} sm={12}>
                    <Input
                        type="text"
                        name="options"
                        defaultValue={getParam("options", "[]")}
                        placeholder="Enter a value in json format. E.g [{'a':'b'}]"
                        fullWidth
                        label="Options"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={12} sm={12}>
                    <Input
                        defaultValue={Number(getParam("list", 1))}
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
                        defaultValue={getParam("position", "none")}
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
                    <SaveButton disabled={!isFormEnabled} fullWidth />
                </Grid>
            </Grid>
        </Form>
    );
};

export default AddEditField;
