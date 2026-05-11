import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useWebCSS, useCurrentRoute } from "@app/hooks";
import { getNavOpen } from "@modules/settings/reducers/platform";

const NavLink = ({ children, to, hidden, submenu, title }) => {
    const isNavOpen = useSelector(getNavOpen);
    const classes = useWebCSS();
    const { getCurrentRoute, getTargetRoute } = useCurrentRoute();
    const currentRoute = getCurrentRoute();
    const targetRoute = getTargetRoute(to);
    const isActive = currentRoute === targetRoute;
    const activeClass = isActive ? "active" : "";
    const submenuClass = submenu ? "submenu" : "";

    return (
        !hidden &&
        (isNavOpen ? (
            <Link className={`${activeClass} ${submenuClass}`} to={to}>
                {children}
            </Link>
        ) : (
            <Tooltip
                title={<h5 className={classes.tooltip}>{title}</h5>}
                placement="right"
                arrow
            >
                <Link className={`${activeClass} ${submenuClass}`} to={to}>
                    {children}
                </Link>
            </Tooltip>
        ))
    );
};

export default NavLink;
