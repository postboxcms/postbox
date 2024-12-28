import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNotifier, useNavigation, useAuthentication, useCSS } from "@app/hooks";
import { IOSSwitch } from "@app/utils/elements";
// layout
import Title from "../../../ui/elements/Title";
// auth manager
import NoRowsOverlay from "../../../ui/elements/NoRowsOverlay";
import Placeholder, { Loader } from "../../../ui/elements/Placeholder";
import ActionsButton from "./ActionsButton";

const List = (props) => {
    const auth = useAuthentication();
    const classes = useCSS();
    const navigate = useNavigation();
    const notify = useNotifier();
    const [cellFocus, setCellFocus] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const entity = props['path'];
    const module = entity.replace('/','');

    const noRowsMessage =
        "No " +
        (props["title"] ? props["title"] : props["name"]) +
        " added yet";
    const Icon =
        typeof data["icon"] !== typeof undefined ? data["icon"] : "square";

    const addContent = (props) => {
        navigate(`/${props["title"]?.toLowerCase()}/add`);
        console.log("add new content");
    };

    const updateCell = (event, data) => {
        data.row[data.field] =
            typeof event.target.type !== typeof undefined &&
            event.target.type == "checkbox"
                ? event.target.checked
                : event.target.value;
        // data.row['module'] = module;
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
        auth.put(`/entity/${module}`, data).then((response) =>
            notify(response.data.message)
        );
    };

    React.useEffect(() => {
        auth.get("/crud" + props["path"]).then((response) => {
            const columnData = response.data.columns;
            columnData.push({
                field: "actions",
                headerName: "ACTIONS",
                headerClassName: "table-header-light",
                flex: 1,
                renderCell: () => <ActionsButton />,
            });

            auth.get("/entity" + props["path"]).then((response) => {
                const dataset = [];
                setData(response.data.entity);

                response.data.entity.data.map((data) => {
                    const rowdata = {};
                    const dataKeys = Object.keys(data);
                    const dataValues = Object.values(data);

                    dataKeys.forEach((parameter, index) => {
                        dataValues[index]["field"] = parameter;
                        rowdata[parameter] = dataValues[index].value;

                        if (dataValues[index].type == "image") {
                            columnData.forEach((column) => {
                                if (column["field"] == parameter) {
                                    column["cellClassName"] =
                                        "grid-image-column";
                                    if (
                                        rowdata[parameter] == null ||
                                        rowdata[parameter] == ""
                                    ) {
                                        column["renderCell"] = () => (
                                            <FontAwesomeIcon
                                                icon={"image"}
                                                size="lg"
                                            />
                                        );
                                    } else {
                                        column["renderCell"] = (params) => (
                                            <img
                                                src={params.value}
                                                className="cell-image"
                                            />
                                        );
                                    }
                                }
                            });
                        }
                        if (dataValues[index].type == "radio") {
                            columnData.forEach((column) => {
                                if (column["field"] == parameter) {
                                    column["cellClassName"] =
                                        "grid-image-column";
                                    column["renderCell"] = (params) => (
                                        <>
                                            <FormControlLabel
                                                onChange={
                                                    (event) =>
                                                        updateCell(
                                                            event,
                                                            params
                                                        )
                                                }
                                                control={
                                                    <IOSSwitch
                                                        sx={{ m: 1 }}
                                                        checked={Boolean(
                                                            params?.value
                                                        )}
                                                    />
                                                }
                                                label=""
                                            />
                                        </>
                                    );
                                }
                            });
                        }
                    });

                    dataset.push(rowdata);
                });

                setRows(dataset);
                setColumns(columnData);
            });
        });
    }, [props["path"]]);

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <FontAwesomeIcon size="lg" icon={Icon} />{" "}
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
                <Button
                    onClick={() => addContent(props)}
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.largebutton}
                    startIcon={<AddIcon />}
                >
                    Add {props["title"] ? props["title"] : props["name"]}
                </Button>
            </div>
            <div className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        NoRowsOverlay: function () {
                            return (
                                <>
                                    <Placeholder check={false}>
                                        <Loader height={50} lines={8} />
                                    </Placeholder>
                                    <NoRowsOverlay
                                        icon={Icon}
                                        message={noRowsMessage}
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

export default List;
