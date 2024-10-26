import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({children, to}) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    const className = isActive ? 'active' : '';

    return (
        <Link className={className} to={to}>
            {children}
        </Link>
    )
}

export default NavLink;