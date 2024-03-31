import React from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import { useCSS } from "../../../hooks/css";
import Title from "../../../ui/elements/Title";

import { IOSSwitch } from "../../../utils/elements";
import { useNotifier } from "../../../hooks/notifications";
import { useAuthentication } from "../../../hooks/auth";

import NoRowsOverlay from "../../../ui/elements/NoRowsOverlay";
import Placeholder, { Loader } from "../../../ui/elements/Placeholder";

const Body = (props) => {
    const classes = useCSS();
    const auth = useAuthentication();
    const [rows, setRows] = React.useState([]);
    const [cellFocus, setCellFocus] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const notify = useNotifier();
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
                                <MenuItem value="hidden">Hidden</MenuItem>
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="password">Password</MenuItem>
                                <MenuItem value="dropdown">Dropdown</MenuItem>
                                <MenuItem value="radio">Radio</MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>
                                <MenuItem value="textarea">Textarea</MenuItem>
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

    const setContentType = (e) => {
        setLoader(true);
        if (e.target.value !== "") {
            setRows([]);
            auth.get("/CRUD/" + e.target.value).then((response) => {
                console.log(response.data.fields)
                setRows(response.data.fields);
                setLoader(false);
            });
        } else {
            setRows([]);
            setLoader(false);
        }
    };

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
        saveField(data.row);
    };

    const saveField = (data) => {
        auth.post("/CRUD", data).then((response) =>
            notify(response.data.message)
        );
    };

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <FontAwesomeIcon size="lg" icon={pageIcon} />{" "}
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
                <FormControl className="dropdown" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        onChange={setContentType}
                        defaultValue=""
                        displayEmpty
                    >
                        <MenuItem value="">Content Type</MenuItem>
                        {props["content_types"]
                            ? props["content_types"].map((ctype, i) => (
                                <MenuItem key={ctype.id} value={ctype.slug}>
                                    {ctype.name}
                                </MenuItem>
                            ))
                            : ""}
                    </Select>
                </FormControl>
            </div>
            <div className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={rows.length}
                    disableSelectionOnClick
                    components={{
                        NoRowsOverlay: function () {
                            return (
                                <>
                                    <Placeholder check={loader}>
                                        <Loader lines={10} height={30} />
                                    </Placeholder>
                                    <NoRowsOverlay
                                        icon={pageIcon}
                                        message="No content type selected"
                                    />
                                </>
                            );
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default Body;