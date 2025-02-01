import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEntitys } from "@modules/Entity/reducers/entities";
import { useSecureRoute } from "@app/hooks";
import { getToken } from "@modules/Auth/reducers/jwt";
import {
    setWebsiteLogo,
    setWebsiteName,
    setWebsiteStatus,
    setWebsiteTitle,
} from "@modules/Settings/reducers/site";

const DataProvider = ({ children }) => {
    const api = useSecureRoute();
    const token = useSelector(getToken);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (token) {
            // set content type data
            api.get("/entity").then((response) => {
                dispatch(setEntitys(response.data));
            });
        }
        // set website data
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
    }, [token]);

    return <React.Fragment>{children}</React.Fragment>;
};

export default DataProvider;
