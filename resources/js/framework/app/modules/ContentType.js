import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
// elements
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
// icons
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// layout
import { Card, Frame } from "../ui/layout/Frame";
import Title from "../ui/elements/Title";
import { useCSS } from "../hooks/css";
import iconList from "../libs/icons";
// auth manager
import { useAuthentication } from "../hooks/auth";
import NoRowsOverlay from "../ui/elements/NoRowsOverlay";
import Placeholder, { Loader } from "../ui/elements/Placeholder";

const ActionsButton = () => {
    const classes = useCSS();
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<EditIcon />}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
            >
                Delete
            </Button>
        </div>
    );
};

const AddContent = (props) => {
    props.setViewState(false);
    console.log("add new content");
};

const CTBody = (props) => {
    const [viewState, setViewState] = React.useState(true);
    if (viewState) {
        return <CTList {...props} setViewState={setViewState} />;
    } else {
        return <CTAddEdit {...props} setViewState={setViewState} />;
    }
};

const CTAddEdit = (props) => {
    return (
        <React.Fragment>
            <Card xs={12}>Add a new component....</Card>
        </React.Fragment>
    );
};

const CTList = (props) => {
    const auth = useAuthentication();
    const classes = useCSS();
    const [rows, setRows] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const noRowsMessage =
        "No " +
        (props["title"] ? props["title"] : props["name"]) +
        " added yet";
    const Icon =
        typeof data["icon"] !== typeof undefined ? data["icon"] : "square";

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Title className={classes.title}>
                    <FontAwesomeIcon size="lg" icon={Icon} />{" "}
                    {props["title"] ? props["title"] : props["name"]}
                </Title>
                <Button
                    onClick={() => AddContent(props)}
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

const ContentType = (props) => {
    return (
        <Frame>
            <Card xs={12}>
                <CTBody {...props} />
            </Card>
        </Frame>
    );
}

export default ContentType;