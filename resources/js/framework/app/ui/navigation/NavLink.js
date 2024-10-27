import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({children, to, submenu}) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    const activeClass = isActive ? 'active' : '';
    const submenuClass = submenu ? 'submenu' : '';

    return (
        <Link className={`${activeClass} ${submenuClass}`} to={to}>
            {children}
        </Link>
    )
}

export default NavLink;