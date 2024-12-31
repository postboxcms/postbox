import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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

import { api, nav } from "@app/utils/constants";
import { getEntitys } from "@modules/Entity/reducers/entities";

export const MainItems = React.memo((props) => {
    const location = useLocation();
    const entities = useSelector(getEntitys);
    const reservedRoutes = [api.adminPrefix.split('/').pop(), 'crud', 'settings'];
    const isOpen = !reservedRoutes.includes(location.pathname.split('/').pop());
    const [open, setOpen] = useState(isOpen);
    const [isHidden, setIsHidden] = useState(false);
    const [timeout, setTimeout] = useState("auto");
    const collapsePanel = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        const totalEntities = entities?.entities?.length;
        if(totalEntities <= nav.maxEntityLimit) {
            setOpen(true);
            setIsHidden(true);
            setTimeout(0);
        }
    },[]);

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
                <NavLink hidden={isHidden} to="#">
                    <ListItem onClick={collapsePanel}>
                        <ListItemIcon>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Content" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </NavLink>
                <Collapse in={open} timeout={timeout}>
                    <List component="div" disablePadding>
                        {entities?.entities?.map((data) => {
                            return (
                                <NavLink
                                    to={api["adminPrefix"] + "/" + data["slug"] + "/list"}
                                    key={data["id"]}
                                    submenu={true}
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
