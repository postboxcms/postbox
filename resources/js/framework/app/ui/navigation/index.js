import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

import NavLink from "./NavLink";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { api } from "../../utils/constants";
import { useAuthentication } from "../../hooks/auth";
import { getContentTypes, setContentTypes } from "../../modules/ContentType/reducers/contentTypes";

export const MainItems = React.memo((props) => {
    // const [contentTypes, setContentTypes] = useState({ content_types: [] });
    const [open, setOpen] = useState(false);
    const auth = useAuthentication();
    const location = useLocation();
    const dispatch = useDispatch();
    const contentTypes = useSelector(getContentTypes);
    const reservedRoutes = [api.adminPrefix.split('/').pop(), 'crud', 'settings']
    const collapsePanel = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        if (contentTypes.length <= 0) {
            auth.get('/ContentType').then((response) => {
                dispatch(setContentTypes(response.data));
            });
        }
        if (!reservedRoutes.includes(location.pathname.split('/').pop())) {
            setOpen(true);
        }
    }, []);

    return (
        <React.Fragment>
            <div className={props.navbar}>
                <NavLink to={api.adminPrefix}>
                    <ListItem>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>
                <NavLink to="#">
                    <ListItem onClick={collapsePanel}>
                        <ListItemIcon>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Content" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </NavLink>
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        {contentTypes?.content_types?.map((data) => {
                            return (
                                <NavLink
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
                                </NavLink>
                            );
                        })}
                    </List>
                </Collapse>
            </div>
        </React.Fragment>
    );
});

export const SubItems = (props) => {
    return (
        <React.Fragment>
            <div className={props.navbar}>
                <ListSubheader inset>Preferences</ListSubheader>
                <NavLink to={api.adminPrefix + "/crud"} key="0">
                    <ListItem>
                        <ListItemIcon>
                            <FontAwesomeIcon size="lg" icon="layer-group" />
                        </ListItemIcon>
                        <ListItemText primary="CRUD" />
                    </ListItem>
                </NavLink>
                <NavLink to={api.adminPrefix + "/settings"} key="1">
                    <ListItem>
                        <ListItemIcon>
                            <FontAwesomeIcon size="lg" icon="gear" />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </NavLink>
            </div>
        </React.Fragment>
    );
};
