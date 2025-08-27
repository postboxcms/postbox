import React from "react";
import PropTypes from "prop-types";
import { forEach } from "lodash";
import { Grid } from "@mui/material";
import { useNotifier, useCMSRoute, useSecureRoute } from "@app/hooks";
import Form from "@ui/components/Form";
import SaveButton from "@ui/elements/SaveButton";
import ClassicButton from "@ui/elements/ClassicButton";
import Input from "@ui/elements/Input";
import { fetchEntries, pushToObject } from "@app/utils";

export const AddEditField = (props) => {
    const { row, typeList, table, positionList, onClose, mode } = props;
    const notify = useNotifier();
    const cms = useCMSRoute();
    const api = useSecureRoute();
    const [field, setField] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [isOptionIsURL, setIsOptionIsURL] = React.useState(false);
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

            let optionSelectors = [];
            const data = new FormData();

            for (const [key, value] of new FormData(event.target)) {
                data.append(key, value);
                console.log("key:", key, "value:", value);

                if (key == "alias") {
                    data.append(
                        "field",
                        value.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()
                    );
                }

                if (key == "type") {
                    const list = typeList.find((item) => item.value == value);
                    if (htmlSelectors.includes(value)) {
                        optionSelectors.push(value);
                    }
                    data.append("dataType", list.dataType);
                }
            }

            if (mode === "edit") {
                data.append("eid", row.tid);
                data.append("fid", row.uuid);
                data.append("field", row.field);
                data.append(
                    "replaceType",
                    typeList.find((item) => item.value === data.get("type"))
                        .dataType || "string"
                );

                cms.patch(`/dbo/${table}`, data)
                    .then((response) => {
                        // insert into CRUD table as well
                        console.log("crud payload:", response);

                        api.patch(`/crud/${row.tid}`, data).then((response) => {
                            notify(response.data.message);
                            onClose();
                        });
                    })
                    .catch((error) => {
                        console.error("Exception:", error);
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
                        notify(
                            "Something went wrong! Please try again",
                            "error"
                        );
                    });
            } else {
                cms.post(`/dbo/${table}`, data)
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
                                table: table,
                            }
                        );

                        api.post("/crud", crudPayload).then((response) => {
                            notify(response.data.message);
                            onClose();
                        });
                    })
                    .catch((error) => {
                        console.error(
                            "Exception:",
                            error?.response?.data?.error
                        );
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
                        notify(
                            "Something went wrong! Please try again",
                            "error"
                        );
                    });
            }
        } catch (error) {
            console.error(error);
            notify("Something went wrong! Please try again", "error");
        }
    };

    const getParam = (param, defaultValue = "") => {
        console.log(
            "getParam called with:",
            param,
            "defaultValue:",
            defaultValue
        );

        return row && Object.prototype.hasOwnProperty.call(row, param)
            ? row[param]
            : defaultValue;
    };

    React.useEffect(() => {
        if (row && getParam("field")) {
            setIsFormEnabled(true);
        }
        const newOptions = getParam("options", []);
        if (newOptions?.length > 0) {
            setOptions(
                getParam("options", [])?.map((option, index) => ({
                    value: option.value || "",
                }))
            );
        }
    }, [row]);

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
                        disabled={mode === "edit"}
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
                        options={typeList}
                        onChange={(e) => {
                            console.log("type changed:", e.target.value);
                            console.log("current options:", options);
                            if (
                                htmlSelectors.includes(e.target.value) &&
                                options?.length <= 0
                            ) {
                                setOptions([...options, { key: 1, value: "" }]);
                            }
                            if (!htmlSelectors.includes(e.target.value)) {
                                setOptions([]);
                                setIsOptionIsURL(false);
                            }
                        }}
                    />
                </Grid>
            </Grid>
            {options?.length > 0 &&
                options?.map((val, key) => {
                    return (
                        <Grid container spacing={2} marginBottom={2}>
                            <Grid item xs={9} sm={9}>
                                <Input
                                    key={key}
                                    type="text"
                                    name="options[]"
                                    defaultValue={val.value}
                                    placeholder={(() => {
                                        if (isOptionIsURL) {
                                            return "jsonplaceholder.typicode.com/posts";
                                        }
                                        if (key === 0) {
                                            return "Provide a json resource or plain text values";
                                        }
                                        return "Provide a value";
                                    })()}
                                    fullWidth
                                    label={"Options"}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Backspace" &&
                                            e.target.value.trim() === ""
                                        ) {
                                            setIsOptionIsURL(false);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={3}
                                sm={3}
                                display="flex"
                                alignItems="center"
                            >
                                <ClassicButton
                                    hidden={key < options.length - 1}
                                    onClick={() => {
                                        setOptions([
                                            ...options,
                                            {
                                                key: key,
                                                value: "",
                                            },
                                        ]);
                                    }}
                                    fullWidth
                                >
                                    +
                                </ClassicButton>
                                <ClassicButton
                                    hidden={key >= options.length - 1}
                                    color="secondary"
                                    onClick={() => {
                                        setOptions([...options.slice(0, -1)]);
                                    }}
                                    fullWidth
                                >
                                    -
                                </ClassicButton>
                            </Grid>
                        </Grid>
                    );
                })}
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
                        options={positionList}
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

AddEditField.propTypes = {
    row: PropTypes.object,
    typeList: PropTypes.array.isRequired,
    table: PropTypes.string.isRequired,
    positionList: PropTypes.array.isRequired,
    mode: PropTypes.oneOf(["add", "edit"]),
    onClose: PropTypes.func,
};

AddEditField.defaultProps = {
    row: {},
    typeList: [],
    table: "",
    positionList: [],
    mode: "add",
    onClose: () => {},
};

export default AddEditField;
