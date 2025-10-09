import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { FormControlLabel } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNotifier, useNavigation, useSecureRoute, useCSS, useAuth } from "@app/hooks";

import IOSSwitch from "@ui/elements/IOSSwitch";
import Title from "@ui/elements/Title";
import ClassicButton from "@ui/elements/ClassicButton";
import NoRowsOverlay from "@ui/components/NoRowsOverlay";
import Placeholder, { Loader } from "@ui/components/Placeholder";

import { loadCRUD, getCRUD } from "@modules/CRUD/reducers/crud";

import ActionButtons from "./ActionButtons";
import { getEntity, loadEntity } from "../reducers/entities";

const List = (props) => {
    const dispatch = useDispatch();
    const api = useSecureRoute();
    const classes = useCSS();
    const navigate = useNavigation();
    const notify = useNotifier();
    const crudData = useSelector(getCRUD);
    const { token } = useAuth();
    const crud = useSelector(getCRUD);
    const entityDetails = useSelector(getEntity);
    const [cellFocus, setCellFocus] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [columns, setColumns] = React.useState(crudData?.columns || []);
    const [triggerRefresh, setTriggerRefresh] = React.useState(false);
    const { title, name, path } = props;
    const entity = path;
    const module = entity.replace("/", "");

    const noRowsMessage =
        "No " +
        (title ? title : name) +
        " added yet";
    const Icon =
        typeof data?.icon !== typeof undefined ? data.icon : "square";

    const addContent = () => {
        navigate(`/${title?.toLowerCase()}/add`);
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
            data.api.updateRows([data.row]);
        }

        saveField(Object.assign({}, field));
    };

    const saveField = (data) => {
        api.put(`/entity/${module}`, data).then((response) => {
            dispatch(loadEntity({ path: entity.slice(1), token: token }));
            notify(response.data.message);
        });
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
        const path = entity.slice(1);
        dispatch(loadCRUD({ path: path, token: token }));
        dispatch(loadEntity({ path: path, token: token }));
    }, [triggerRefresh]);

    React.useEffect(() => {
        const updateColumns = [];
        const dataset = [];
        const columnData = [
            ...crud?.columns || [],
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
                    columnData.map((column) => {
                        if (column["field"] == parameter) {
                            updateColumns.push({
                                ...column,
                                cellClassName: "grid-image-column",
                                renderCell: (params) => (
                                    <ImageCell {...params} />
                                ),
                            });
                            columnData.splice(columnData.findIndex((col) => col.field === parameter), 1);
                        }
                    });
                }
                if (dataValues[index].type == "switch") {
                    columnData.map((column) => {
                        if (column["field"] == parameter) {
                            updateColumns.push({
                                ...column,
                                cellClassName: "grid-image-column",
                                renderCell: (params) => (
                                    <>
                                        <FormControlLabel
                                            onChange={(event) => {
                                                updateCell(event, params);
                                            }}
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
                                ),
                            });
                            columnData.splice(columnData.findIndex((col) => col.field === parameter), 1);
                        }
                    });
                }
            });

            dataset.push(rowdata);
        });

        setData(entityDetails?.entity);
        setRows(dataset);
        if (updateColumns.length > 0) {
            setColumns([...updateColumns, ...columnData]);
        } else {
            setColumns(columnData);
        }
    }, [entityDetails]);

    React.useEffect(() => {
        const columnData = crudData.columns;
        setColumns([
            ...columnData || [],
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
                    {title ? title : name}
                </Title>
                <ClassicButton
                    onClick={() => addContent()}
                    icon="fa-plus"
                    sx={{ float: "right", marginBottom: 1 }}
                >
                    Add {title ? title : name}
                </ClassicButton>
            </div>
            <div className={classes.grid}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{
                        [`& .${gridClasses.cell}:focus-within`]: {
                            outline: 'none !important', // Removes the outline on focus
                        },
                        [`& .${gridClasses.columnHeader}:focus-within`]: {
                            outline: 'none !important', // Removes the outline on header focus
                        },
                    }}
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
