import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCurrentRoute } from "@app/hooks";
import { getNavOpen } from "@modules/settings/reducers/platform";

const NavLink = ({ children, to, hidden, submenu, title }) => {
    const isNavOpen = useSelector(getNavOpen);
    const { getCurrentRoute, getTargetRoute } = useCurrentRoute();
    const currentRoute = getCurrentRoute();
    const targetRoute = getTargetRoute(to);
    const isActive = currentRoute === targetRoute;
    const activeClass = isActive ? "active" : "";
    const submenuClass = submenu ? "submenu" : "";

    return (
        !hidden && (
            <Link
                className={`app-nav-link ${activeClass} ${submenuClass} block rounded-md ${isActive ? 'app-nav-active' : ''}`}
                title={!isNavOpen ? title : undefined}
                to={to}
            >
                {children}
            </Link>
        )
    );
};

export default NavLink;
