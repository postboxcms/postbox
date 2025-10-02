import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEntities } from "@modules/Entity/reducers/entities";
import { useSecureRoute, useNotifier } from "@app/hooks";
import { getToken } from "@modules/Auth/reducers/user";
import {
    setWebsiteLogo,
    setWebsiteName,
    setWebsiteStatus,
    setWebsiteTitle,
} from "@modules/Settings/reducers/site";
import { getNotification } from "@modules/Settings/reducers/platform";
import { loadEntities } from "@modules/Entity/reducers/entities";

const DataProvider = ({ children }) => {
    const api = useSecureRoute();
    const notification = useSelector(getNotification);
    const notify = useNotifier();
    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const hasNotification = notification && notification.message !== '';
    const hasUserAuthenticated = token;
    const hasAdminRoute = window.location.href.includes('/admin') ? true : false;

    React.useEffect(() => {
        if (hasUserAuthenticated) {
            dispatch(loadEntities(token));
        }
        if (hasNotification) {
            if (notification.type == "error") {
                notify(notification.message, "error");
            } else {
                notify(notification.message);
            }
        }
        if (!hasAdminRoute) {
            api.get("/website").then((res) => {
                const settings = res?.data?.data;
                settings.map((item) => {
                    switch (item.property) {
                        case "name":
                            dispatch(setWebsiteName(item.value));
                            return;
                        case "title":
                            dispatch(setWebsiteTitle(item.value));
                            return;
                        case "isProductionReady":
                            dispatch(setWebsiteStatus(Boolean(Number(item.value))));
                            return;
                        case "siteLogo":
                            dispatch(setWebsiteLogo(item.value));
                            return;
                        default:
                            return;
                    }
                });
            });
        }
    }, []);

    return <React.Fragment>{children}</React.Fragment>;
};

export default DataProvider;
