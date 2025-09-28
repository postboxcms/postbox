import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import { FormControlLabel } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNotifier, useNavigation, useSecureRoute, useCSS } from "@app/hooks";

import IOSSwitch from "@ui/elements/IOSSwitch";
import Title from "@ui/elements/Title";
import ClassicButton from "@ui/elements/ClassicButton";
import NoRowsOverlay from "@ui/components/NoRowsOverlay";
import Placeholder, { Loader } from "@ui/components/Placeholder";

import { loadCRUD, getCRUD } from "@modules/CRUD/reducers/crud";
import { getToken } from "@modules/Auth/reducers/user";

import ActionButtons from "./ActionButtons";
import { getEntity, loadEntity } from "../reducers/entities";

const List = (props) => {
    const api = useSecureRoute();
    const classes = useCSS();
    const navigate = useNavigation();
    const notify = useNotifier();
    const crudData = useSelector(getCRUD);
    const token = useSelector(getToken);
    const crud = useSelector(getCRUD);
    const entityDetails = useSelector(getEntity);
    const [cellFocus, setCellFocus] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const [triggerRefresh, setTriggerRefresh] = React.useState(false);
    const entity = props["path"];
    const module = entity.replace("/", "");
    const dispatch = useDispatch();

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
        field["id"] = data.id;
        field["uuid"] = data.row?.uuid;
        field["module"] = module;
        field[data.field] =
            (typeof event.target.type !== typeof undefined &&
                event.target.type == "checkbox") ||
                event.target.type == "radio"
                ? event.target.checked
                : event.target.value;
        if (
            typeof event.target.type === typeof undefined ||
            event.target.type == "checkbox" ||
            event.target.type == "radio"
        ) {
            data.row[data.field] = field[data.field];
            setCellFocus(!cellFocus);
            data.api.setCellFocus(cellFocus);
        }

        saveField(Object.assign({}, field));
    };

    const saveField = (data) => {
        api.put(`/entity/${module}`, data).then((response) =>
            notify(response.data.message)
        );
    };

    const ImageCell = (params) => {
        const { value } = params;
        return (
            (!value && <FontAwesomeIcon icon={"image"} size="lg" />) || (
                <img
                    src={`/uploads/${module}/${value}`}
                    className="cell-image"
                />
            )
        );
    };

    React.useEffect(() => {
        const path = props?.path.slice(1);
        dispatch(loadCRUD({ path: path, token: token }));
        dispatch(loadEntity({ path: path, token: token }));
        // api.get("/crud" + props["path"]).then((response) => {
        //     const columnData = response.data.columns;
        //     columnData.push({
        //         field: "actions",
        //         headerName: "ACTIONS",
        //         headerClassName: "table-header-light",
        //         flex: 1,
        //         renderCell: (params) => (
        //             <ActionButtons
        //                 entity={params}
        //                 module={module}
        //                 refresh={() => setTriggerRefresh(!triggerRefresh)}
        //             />
        //         ),
        //     });

        //     api.get("/entity" + props["path"]).then((response) => {
        //         const dataset = [];
        //         setData(response.data.entity);

        //         response.data.entity.data.map((data) => {
        //             const rowdata = {};
        //             const dataKeys = Object.keys(data);
        //             const dataValues = Object.values(data);

        //             dataKeys.forEach((parameter, index) => {
        //                 dataValues[index]["field"] = parameter;
        //                 rowdata[parameter] = dataValues[index].value;
        //                 console.log("parameter", rowdata[parameter]);

        //                 if (dataValues[index].type == "image") {
        //                     columnData.forEach((column) => {
        //                         if (column["field"] == parameter) {
        //                             column["cellClassName"] =
        //                                 "grid-image-column";
        //                             column["renderCell"] = (params) => (
        //                                 <ImageCell {...params} />
        //                             );
        //                         }
        //                     });
        //                 }
        //                 if (dataValues[index].type == "switch") {
        //                     columnData.forEach((column) => {
        //                         if (column["field"] == parameter) {
        //                             column["cellClassName"] =
        //                                 "grid-image-column";
        //                             column["renderCell"] = (params) => (
        //                                 <>
        //                                     <FormControlLabel
        //                                         onChange={(event) =>
        //                                             updateCell(event, params)
        //                                         }
        //                                         control={
        //                                             <IOSSwitch
        //                                                 sx={{ m: 1 }}
        //                                                 checked={Boolean(
        //                                                     params?.value
        //                                                 )}
        //                                             />
        //                                         }
        //                                         label=""
        //                                     />
        //                                 </>
        //                             );
        //                         }
        //                     });
        //                 }
        //             });

        //             dataset.push(rowdata);
        //         });

        //         setRows(dataset);
        //         setColumns(columnData);
        //     });
        // });
    }, [props["path"], triggerRefresh]);

    React.useEffect(() => {
        const dataset = [];
        const columnData = [
            ...crud?.columns,
            {
                field: "actions",
                headerName: "ACTIONS",
                headerClassName: "table-header-light",
                flex: 1,
                renderCell: (params) => (
                    <ActionButtons
                        entity={params}
                        module={module}
                        refresh={() => setTriggerRefresh(!triggerRefresh)}
                    />
                ),
            }];

        entityDetails?.entity?.data?.map((data) => {
            const rowdata = {};
            const dataKeys = Object.keys(data);
            const dataValues = Object.values(data);

            dataKeys.forEach((parameter, index) => {
                // dataValues[index]["field"] = parameter; // check this code -TODO: PBX
                rowdata[parameter] = dataValues[index].value;
                console.log("parameter", rowdata[parameter]);

                if (dataValues[index].type == "image") {
                    columnData.forEach((column) => {
                        if (column["field"] == parameter) {
                            column["cellClassName"] =
                                "grid-image-column";
                            column["renderCell"] = (params) => (
                                <ImageCell {...params} />
                            );
                        }
                    });
                }
                if (dataValues[index].type == "switch") {
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

        setData(entityDetails?.entity);
        setRows(dataset);
        setColumns(columnData);
    }, [crud, entityDetails]);

    React.useEffect(() => {
        const columnData = crudData.columns;
        setColumns([
            ...columnData,
            {
                field: "actions",
                headerName: "ACTIONS",
                headerClassName: "table-header-light",
                flex: 1,
                renderCell: (params) => (
                    <ActionButtons
                        entity={params}
                        module={module}
                        refresh={() => setTriggerRefresh(!triggerRefresh)}
                    />
                ),
            }]);
    }, [crudData]);

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title icon={Icon}>
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
                <ClassicButton
                    onClick={() => addContent(props)}
                    icon="fa-plus"
                    sx={{ float: "right", marginBottom: 1 }}
                >
                    Add {props["title"] ? props["title"] : props["name"]}
                </ClassicButton>
            </div>
            <div className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
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
