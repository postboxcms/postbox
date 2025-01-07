import React from "react";

import { MenuItem, Select, FormControl, FormControlLabel, TextField, Button, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useCSS, useModal } from "@app/hooks";
import { useNotifier } from "@app/hooks/notifications";

import { useAuthentication } from "@app/hooks/auth";

import IOSSwitch from "@ui/elements/IOSSwitch";
import Title from "@ui/elements/Title";
import Dialog from "@ui/components/Dialog";
import DataTable from "@ui/components/DataTable";

const Body = (props) => {
    const classes = useCSS();
    const modal = useModal();
    const auth = useAuthentication();
    const notify = useNotifier();
    const [addRows, setAddRows] = React.useState(false);
    const [formdata, setFormdata] = React.useState({});
    const [cellFocus, setCellFocus] = React.useState(false);
    const [endpoint, setEndpoint] = React.useState(null);
    const pageIcon = "fa-layer-group";

    const columns = [
        {
            field: "id",
            headerClassName: "table-header-light",
            headerName: "ID",
            width: 0,
            hide: true,
        },
        {
            field: "table",
            headerClassName: "table-header-light",
            headerName: "TABLE",
            width: 0,
            hide: true,
        },
        {
            field: "field",
            headerClassName: "table-header-light",
            headerName: "FIELD",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        <TextField
                            disabled
                            value={params.value}
                            id="outlined-basic"
                            label=""
                            size="small"
                            variant="outlined"
                        />
                    </div>
                );
            },
        },
        {
            field: "alias",
            headerName: "ALIAS",
            headerClassName: "table-header-light",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        <TextField
                            onChange={(event) => updateCell(event, params)}
                            defaultValue={params.value}
                            label=""
                            size="small"
                            variant="outlined"
                            onKeyDown={(event) => {
                                event.stopPropagation();
                            }}
                        />
                    </div>
                );
            },
        },
        {
            field: "type",
            headerName: "TYPE",
            headerClassName: "table-header-light",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <FormControl
                            className="dropdown data-dropdown"
                            sx={{ m: 1, minWidth: 120 }}
                        >
                            <Select
                                defaultValue={"hidden"}
                                value={params.value ? params.value : "hidden"}
                                onChange={(event) => updateCell(event, params)}
                            >
                                <MenuItem value="index">Index</MenuItem>
                                <MenuItem value="hidden">Hidden</MenuItem>
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="password">Password</MenuItem>
                                <MenuItem value="dropdown">Dropdown</MenuItem>
                                <MenuItem value="radio">Radio</MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>
                                <MenuItem value="textarea">Textarea</MenuItem>
                                <MenuItem value="ckeditor">CKEditor</MenuItem>
                                <MenuItem value="image">Image</MenuItem>
                                <MenuItem value="timestamp">Timestamp</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                );
            },
        },
        {
            field: "list",
            alignItems: "center",
            headerName: "VIEW IN LIST",
            headerClassName: "table-header-light",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <FormControlLabel
                            onChange={(event) => updateCell(event, params)}
                            control={
                                <IOSSwitch
                                    sx={{ m: 1 }}
                                    checked={
                                        params.value
                                            ? Boolean(params.value)
                                            : false
                                    }
                                />
                            }
                            label=""
                        />
                    </>
                );
            },
        },
        {
            field: "position",
            headerName: "EDIT PAGE POSITION",
            headerClassName: "table-header-light",
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <FormControl
                            className="dropdown data-dropdown"
                            sx={{ m: 1, minWidth: 120 }}
                        >
                            <Select
                                onChange={(event) => updateCell(event, params)}
                                defaultValue={"none"}
                                value={params.value ? params.value : "none"}
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="left">Left</MenuItem>
                                <MenuItem value="right">Right</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                );
            },
        },
    ];

    const updateCell = (event, data) => {
        data.row[data.field] =
            typeof event.target.type !== typeof undefined &&
                event.target.type == "checkbox"
                ? event.target.checked
                : event.target.value;
        data.value = data.row[data.field];
        data.formattedValue = data.row[data.field];
        if (
            typeof event.target.type === typeof undefined ||
            event.target.type == "checkbox"
        ) {
            setCellFocus(!cellFocus);
            data.api.setCellFocus(cellFocus);
        }

        if (event.target.type == 'text') {
            setTimeout(() => {
                setFormdata(data.row);
            }, 4000);
        } else {
            saveField(data.row);
        }
    };

    const saveField = (data) => {
        auth.post("/crud", data).then((response) => {
            notify(response.data.message);
            setFormdata({});
        });
    };

    React.useEffect(() => {
        if (Object.keys(formdata).length > 0) {
            saveField(formdata);
        }
    }, [formdata]);

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title icon={pageIcon}>
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
                <FormControl className="controls" sx={{ m: 1, minWidth: 80 }}>
                    <Button type="button"
                        onClick={() => modal.handleOpen(<p>New fields will show here ...</p>)}
                        variant="contained"
                        color="primary"
                        disabled={!addRows}
                        startIcon={<AddIcon />}>New field</Button>
                    <Select
                        onChange={(e) => e.target.value ? setEndpoint("/crud/" + e.target.value) : setEndpoint("")}
                        defaultValue=""
                        displayEmpty
                    >
                        <MenuItem value="">Content Type</MenuItem>
                        {props["entities"]
                            ? props["entities"].map((entity, i) => (
                                <MenuItem key={entity.id} value={entity.slug}>
                                    {entity.name}
                                </MenuItem>
                            ))
                            : ""}
                    </Select>
                </FormControl>
            </div>
            <div className={classes.grid}>
                <DataTable
                    headers={columns}
                    api={endpoint}
                    onUpdate={() => setAddRows(true)}
                    onReset={() => setAddRows(false)}
                />
            </div>
            <div>
                <Dialog title="Add a new field" {...modal} />
            </div>
        </React.Fragment>
    );
};

export default Body;