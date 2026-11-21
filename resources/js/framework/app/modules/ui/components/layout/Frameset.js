import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { platform } from '@app/constants';
import { useAppCSS } from '@app/hooks';
import { getNavOpen, setNavOpen } from '@modules/settings/reducers/platform';
import { getUser } from '@modules/auth/reducers/user';

import { MainItems, SubItems } from '@ui/components/navigation';
import Breadcrumb from '@ui/components/Breadcrumb';
import Footer from '@ui/components/Footer';
import Logo from '@ui/components/elements/Logo';
import Icon from '@ui/components/elements/Icon';
import TopMenu from '@ui/components/layout/TopMenu';

export default function Frameset(props) {
    const classes = useAppCSS();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const isNavOpen = useSelector(getNavOpen);
    const [anchor, setAnchor] = React.useState(false);
    const [open, setOpen] = React.useState(isNavOpen);

    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(setNavOpen(!open));
    };

    React.useEffect(() => {
        setOpen(isNavOpen);
    }, [isNavOpen]);

    const renderComponent = (componentProps) => {
        const PageComponent = componentProps.controller;
        return <PageComponent {...componentProps} />;
    };

    return (
        <div className="app-root flex h-screen overflow-hidden bg-slate-50 text-slate-700">
            <aside className={`${classes.drawerPaper} ${!open ? classes.drawerPaperClose : ''} navbar-dark`}>
                <div className="toolbar-icon">
                    {open ? <Logo mode="dark" variant="full" /> : <Logo />}
                </div>
                <div className="mx-3 border-t border-white/20" />
                <nav aria-label="Main navigation" className="py-2">
                    <MainItems {...classes} sidebarExpanded={open} />
                </nav>
                <div className="mx-3 border-t border-white/20" />
                <nav aria-label="Preferences" className="py-2">
                    <SubItems {...classes} sidebarExpanded={open} />
                </nav>
            </aside>
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <header className="app-header z-20 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 px-4 shadow-sm">
                    <button
                        type="button"
                        aria-label="Toggle navigation"
                        aria-expanded={open}
                        onClick={handleDrawerToggle}
                        className="app-primary-text rounded-md p-2 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                        <Icon name="fa-bars" />
                    </button>
                    <h1 className="min-w-0 flex-1 truncate text-base font-semibold">
                        <Breadcrumb title={props.title} />
                    </h1>
                    <button
                        type="button"
                        aria-label="Open account menu"
                        aria-expanded={anchor}
                        onClick={() => setAnchor(!anchor)}
                        className="app-primary-avatar flex h-9 w-9 items-center justify-center rounded-full font-semibold text-white"
                    >
                        {user?.name?.charAt(0) || '?'}
                    </button>
                    <TopMenu anchor={anchor} state={setAnchor} />
                </header>
                <main className="content min-w-0 flex-1 overflow-auto">
                    <div className="appbar-spacer hidden" />
                    <div className="w-full max-w-none p-4">
                        {renderComponent(props)}
                        <div className="pt-4">
                            <Footer
                                prefix={() => <>Crafting with <Icon name="fa-heart" size="sm" color="#a1183f" /> at </>}
                                suffix={() => " since " + platform.companyYear}
                                linkText={platform.company}
                                linkURL={platform.companyURL}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
