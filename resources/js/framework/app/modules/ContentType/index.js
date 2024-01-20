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
import { Card, Frame } from "../../layout/layout/Frame";
import Title from "../../layout/elements/Title";
import { useCSS } from "../../hooks/css";
import iconList from "../../utils/icons";
// auth manager
import { useAuthentication } from "../../hooks/auth";
import NoRowsOverlay from "../../layout/elements/NoRowsOverlay";
import Placeholder, { Loader } from "../../layout/elements/Placeholder";

import Body from "./Body";

const ContentType = (props) => {
    return (
        <Frame>
            <Card xs={12}>
                <Body {...props} />
            </Card>
        </Frame>
    );
}

export default ContentType;