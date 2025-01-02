import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {Tooltip} from "@mui/material";
import { getNavOpen } from "@modules/Settings/reducers/platform";

const NavLink = ({children, to, hidden, submenu, title}) => {
    const isNavOpen = useSelector(getNavOpen);
    const location = useLocation();
    const isActive = location.pathname === to;
    const activeClass = isActive ? 'active' : '';
    const submenuClass = submenu ? 'submenu' : '';

    return !hidden && 
        (isNavOpen ? <Link className={`${activeClass} ${submenuClass}`} to={to}>
            {children}
        </Link>:<Tooltip title={<h5>{title}</h5>} placement="right" arrow><Link className={`${activeClass} ${submenuClass}`} to={to}>
            {children}
        </Link></Tooltip>);
}

export default NavLink;