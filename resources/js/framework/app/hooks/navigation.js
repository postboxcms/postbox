import { useHistory, useLocation } from "react-router-dom";
import { api } from "../utils/constants";

export const useNavigation = () => {
    const history = useHistory();

    return (url) => {
        history.push(api.adminPrefix + url);
    }
}

export const useCurrentRoute = () => {
    const location = window.location;
    const routePrefix = (path) => {
        const parts = path.split("/").filter(Boolean);
        return "/" + parts.slice(0, 2).join("/");
    };
    const getCurrentRoute = () => routePrefix(location.pathname);
    const getEntityRoute = () => routePrefix(location.pathname).replace(api.adminPrefix, "");
    const getTargetRoute = (to) => routePrefix(to);
    return {
        getCurrentRoute,
        getEntityRoute,
        getTargetRoute
    };
}