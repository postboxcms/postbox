import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { api } from "../../utils/constants";
import { useAuthentication } from "../../hooks/auth";

export const MainItems = (props) => {
    const [contentTypes, setContentTypes] = useState({ content_types: [] });
    const [open, setOpen] = useState(false);
    const auth = useAuthentication();
    const location = useLocation();
    const collapsePanel = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        auth.get('/ContentType').then((response) => {
            setContentTypes(response.data);
            response.data?.content_types.map((type) => {
                console.log('route', location.pathname);
                if (location.pathname.includes(type.slug)) {
                    setOpen(true);
                }
            })
        });
    }, []);

    return (
        <React.Fragment>
            <div className={props.navbar}>
                <Link to={api.adminPrefix}>
                    <ListItem>
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
                                    to={api["adminPrefix"] + "/" + data["slug"] + "/list"}
                                    key={data["id"]}
                                >
                                    <ListItem>
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
                    <ListItem>
                        <ListItemIcon>
                            <FontAwesomeIcon size="lg" icon="layer-group" />
                        </ListItemIcon>
                        <ListItemText primary="CRUD" />
                    </ListItem>
                </Link>
                <Link to={api.adminPrefix + "/settings"} key="1">
                    <ListItem>
                        <ListItemIcon>
                            <FontAwesomeIcon size="lg" icon="gear" />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </Link>
            </div>
        </React.Fragment>
    );
};
