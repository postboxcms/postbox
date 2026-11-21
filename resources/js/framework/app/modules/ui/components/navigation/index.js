import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import NavLink from "./NavLink";
import Icon from "@ui/components/elements/Icon";

import { api } from "@app/constants";
import { getEntities } from "@modules/entity/reducers/entities";

export const MainItems = React.memo(({ navbar, sidebarExpanded = true }) => {
    const location = useLocation();
    const entityList = useSelector(getEntities);
    const entities = entityList?.entities || [];
    const activeEntity = entities.some(({ slug }) => location.pathname.includes(`/${slug}/`));
    const [open, setOpen] = useState(true);

    React.useEffect(() => {
        if (activeEntity) setOpen(true);
    }, [activeEntity]);

    return (
        <div className={navbar}>
            <NavLink title="Dashboard" to={api.adminPrefix}>
                <span className={`app-nav-item flex items-center gap-3 rounded-md px-3 py-2 ${!sidebarExpanded ? 'justify-center' : ''}`}>
                    <Icon name="fa-gauge-high" />
                    {sidebarExpanded && <span>Dashboard</span>}
                </span>
            </NavLink>
            {entities.length > 0 && (
                <button
                    type="button"
                    aria-label={sidebarExpanded ? 'Toggle content navigation' : 'Content navigation'}
                    aria-expanded={open}
                    title={!sidebarExpanded ? 'Content' : undefined}
                    onClick={() => setOpen(!open)}
                    className={`app-nav-item flex w-[calc(100%-1rem)] items-center gap-3 rounded-md px-3 py-2 text-left ${!sidebarExpanded ? 'mx-2 justify-center' : ''}`}
                >
                    <Icon name="fa-layer-group" />
                    {sidebarExpanded && (
                        <>
                            <span className="flex-1">Content</span>
                            <Icon name={open ? "fa-chevron-up" : "fa-chevron-down"} size="sm" />
                        </>
                    )}
                </button>
            )}
            <div className={`overflow-hidden transition-[max-height] duration-200 ${open ? 'max-h-[70vh]' : 'max-h-0'}`}>
                <ul className="space-y-1">
                    {entities.map((data) => (
                        <NavLink
                            title={data.name}
                            to={`${api.adminPrefix}/${data.slug}/list`}
                            key={data.id}
                            submenu
                        >
                            <span className={`app-nav-item flex items-center gap-3 rounded-md px-3 py-2 ${sidebarExpanded ? 'pl-6' : 'justify-center'}`}>
                                <Icon size="lg" icon={data.icon} />
                                {sidebarExpanded && <span>{data.name}</span>}
                            </span>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </div>
    );
});

export const SubItems = ({ navbar, sidebarExpanded = true }) => (
    <div className={navbar}>
        {sidebarExpanded && <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Preferences</p>}
        <NavLink title="CRUD" to={`${api.adminPrefix}/crud`}>
            <span className={`app-nav-item flex items-center gap-3 rounded-md px-3 py-2 ${!sidebarExpanded ? 'justify-center' : ''}`}>
                <Icon size="lg" icon="fa-layer-group" />
                {sidebarExpanded && <span>CRUD</span>}
            </span>
        </NavLink>
        <NavLink title="Settings" to={`${api.adminPrefix}/settings`}>
            <span className={`app-nav-item flex items-center gap-3 rounded-md px-3 py-2 ${!sidebarExpanded ? 'justify-center' : ''}`}>
                <Icon size="lg" icon="fa-gear" />
                {sidebarExpanded && <span>Settings</span>}
            </span>
        </NavLink>
    </div>
);
