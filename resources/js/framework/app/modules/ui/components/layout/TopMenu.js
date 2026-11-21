import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { api } from '@app/constants';
import { useNavigation, useAuth } from '@app/hooks';
import { logoutUser } from '@modules/auth/reducers/user';
import Icon from '@ui/components/elements/Icon';

export const TopMenu = (props) => {
    const navigate = useNavigation();
    const { token } = useAuth();
    const dispatch = useDispatch();

    const processLogout = () => {
        dispatch(logoutUser(token));
        props.state(false);
        navigate(api.loginUrl);
    };

    React.useEffect(() => {
        if (!props.anchor) return undefined;
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') props.state(false);
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [props.anchor, props.state]);

    if (!props.anchor) return null;

    return (
        <>
            <button
                type="button"
                aria-label="Close account menu"
                className="fixed inset-0 z-30 cursor-default"
                onClick={() => props.state(false)}
            />
            <div id="account-menu" role="menu" className="absolute right-4 top-14 z-40 min-w-48 rounded-lg border border-slate-200 bg-white p-1 text-sm shadow-lg">
                <button type="button" role="menuitem" className="flex w-full items-center gap-3 rounded px-3 py-2 text-left hover:bg-slate-50">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200" aria-hidden="true" />
                    Profile
                </button>
                <button type="button" role="menuitem" className="flex w-full items-center gap-3 rounded px-3 py-2 text-left hover:bg-slate-50">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200" aria-hidden="true" />
                    My account
                </button>
                <div className="my-1 border-t border-slate-200" />
                <Link
                    to={api.loginUrl}
                    role="menuitem"
                    onClick={processLogout}
                    className="flex items-center gap-3 rounded px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                    <Icon name="fa-right-from-bracket" />
                    Logout
                </Link>
            </div>
        </>
    );
};

export default TopMenu;
