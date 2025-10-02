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
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import NavLink from "./NavLink";

import Icon from "@ui/elements/Icon";

import { api, nav } from "@app/utils/constants";
import { getEntities } from "@modules/Entity/reducers/entities";

export const MainItems = React.memo((props) => {
    const location = useLocation();
    const entityList = useSelector(getEntities);
    const reservedRoutes = [
        api.adminPrefix.split("/").pop(),
        "crud",
        "settings",
    ];
    const isEntityListLarge = entityList?.entities?.length <= nav.maxEntityLimit;
    const isOpen = !reservedRoutes.includes(location.pathname.split("/").pop()) || isEntityListLarge;
    const [open, setOpen] = useState(isOpen);
    const [isHidden, setIsHidden] = useState(isEntityListLarge);
    const [timeout, setTimeout] = useState("auto");
    const collapsePanel = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        if (isEntityListLarge) {
            setOpen(true);
            setIsHidden(true);
            setTimeout(0);
        }
    }, []);

    return (
        <React.Fragment>
            <div className={props.navbar}>
                <NavLink title="Dashboard" to={api.adminPrefix}>
                    <ListItem>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </NavLink>
                <NavLink title="Content" hidden={isHidden} to="#">
                    <ListItem onClick={collapsePanel}>
                        <ListItemIcon>
                            <CollectionsBookmarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Content" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </NavLink>
                <Collapse in={open} timeout={timeout}>
                    <List component="div" disablePadding>
                        {entityList?.entities?.map((data) => {
                            return (
                                <NavLink
                                    title={data["name"]}
                                    to={
                                        api["adminPrefix"] +
                                        "/" +
                                        data["slug"] +
                                        "/list"
                                    }
                                    key={data["id"]}
                                    submenu={true}
                                >
                                    <ListItem>
                                        <ListItemIcon>
                                            <Icon
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
                <NavLink title="CRUD" to={api.adminPrefix + "/crud"} key="0">
                    <ListItem>
                        <ListItemIcon>
                            <Icon size="lg" icon="fa-layer-group" />
                        </ListItemIcon>
                        <ListItemText primary="CRUD" />
                    </ListItem>
                </NavLink>
                <NavLink
                    title="Settings"
                    to={api.adminPrefix + "/settings"}
                    key="1"
                >
                    <ListItem>
                        <ListItemIcon>
                            <Icon size="lg" icon="fa-gear" />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </NavLink>
            </div>
        </React.Fragment>
    );
};
