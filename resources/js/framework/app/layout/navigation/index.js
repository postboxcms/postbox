import React, { useState } from "react";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { nav, api } from "../../utils/constants";
import cookies from "../../utils/cookies";
import { useAuthentication } from "../../hooks/auth";

export const MainItems = (props) => {
    const [contentTypes, setContentTypes] = useState({ content_types: [] });
    const [open, setOpen] = useState(false);
    const auth = useAuthentication();
    const collapsePanel = () => {
        setOpen(!open);
        if (!open) {
            cookies.setCookie(nav.menuToken, "open");
        } else {
            cookies.setCookie(nav.menuToken, "closed");
        }
    };

    React.useEffect(() => {
        auth.get('/ContentType').then((response) => setContentTypes(response.data));
    },[]);

    return (
        <React.Fragment>
            <div className={props.navbar}>
                <Link to={api.adminPrefix}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                <Link to="#">
                    <ListItem button onClick={collapsePanel}>
                        <ListItemIcon>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Content" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </Link>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {contentTypes["content_types"].map((data) => {
                            return (
                                <Link
                                    to={api["adminPrefix"] + "/" + data["slug"]}
                                    key={data["id"]}
                                >
                                    <ListItem button>
                                        <ListItemIcon>
                                            <FontAwesomeIcon
                                                size="lg"
                                                icon={data["icon"]}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={data["name"]} />
                                    </ListItem>
                                </Link>
                            );
                        })}
                    </List>
                </Collapse>
            </div>
        </React.Fragment>
    );
};

export const SubItems = (props) => {
    return (
        <React.Fragment>
            <div className={props.navbar}>
                <ListSubheader inset>Preferences</ListSubheader>
                <Link to={api.adminPrefix + "/crud"} key="0">
                    <ListItem button>
                        <ListItemIcon>
                            <FontAwesomeIcon size="lg" icon="layer-group" />
                        </ListItemIcon>
                        <ListItemText primary="CRUD" />
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
            </div>
        </React.Fragment>
    );
};
