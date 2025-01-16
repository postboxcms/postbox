import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    useNotifier,
    useNavigation,
    useSecureRoute,
    useCSS,
} from "@app/hooks";

import IOSSwitch from "@ui/elements/IOSSwitch";
import Title from "@ui/elements/Title";
import PrimaryButton from "@ui/elements/PrimaryButton";
import NoRowsOverlay from "@ui/components/NoRowsOverlay";
import Placeholder, { Loader } from "@ui/components/Placeholder";

import ActionsButton from "./ActionsButton";

const List = (props) => {
    const api = useSecureRoute();
    const classes = useCSS();
    const navigate = useNavigation();
    const notify = useNotifier();
    const [cellFocus, setCellFocus] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const entity = props["path"];
    const module = entity.replace("/", "");

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
        const field = [];
        field['id'] = data.id;
        field["module"] = module;
        field[data.field] =
            (typeof event.target.type !== typeof undefined &&
                event.target.type == "checkbox") ||
            event.target.type == "radio"
                ? event.target.checked
                : event.target.value;
        if (
            typeof event.target.type === typeof undefined ||
            event.target.type == "checkbox" || event.target.type == "radio"
        ) {
            data.row[data.field] = field[data.field];
            setCellFocus(!cellFocus);
            data.api.setCellFocus(cellFocus);
        }

        saveField(Object.assign({},field));
    };

    const saveField = (data) => {
        api.put(`/entity/${module}`, data).then((response) =>
            notify(response.data.message)
        );
    };

    React.useEffect(() => {
        api.get("/crud" + props["path"]).then((response) => {
            const columnData = response.data.columns;
            columnData.push({
                field: "actions",
                headerName: "ACTIONS",
                headerClassName: "table-header-light",
                flex: 1,
                renderCell: () => <ActionsButton />,
            });

            api.get("/entity" + props["path"]).then((response) => {
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
                                                onChange={(event) =>
                                                    updateCell(event, params)
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
                <Title icon={Icon}>
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
                <PrimaryButton
                    onClick={() => addContent(props)}
                    icon="fa-plus"
                    sx={{ float: 'right', marginBottom: 1 }}
                >
                    Add {props["title"] ? props["title"] : props["name"]}
                </PrimaryButton>
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
