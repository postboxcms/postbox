import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContentTypes } from "@modules/ContentType/reducers/contentTypes";
import { useAuthentication } from "@app/hooks";
import { getToken } from "@modules/Auth/reducers/jwt";
import {
    setWebsiteLogo,
    setWebsiteName,
    setWebsiteStatus,
    setWebsiteTitle,
} from "@modules/Settings/reducers/site";

const DataProvider = ({ children }) => {
    const auth = useAuthentication();
    const token = useSelector(getToken);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (token) {
            // set content type data
            auth.get("/ContentType").then((response) => {
                dispatch(setContentTypes(response.data));
            });
        }
        // set website data
        auth.get("/Website").then((res) => {
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
                        dispatch(
                            setWebsiteStatus(Boolean(Number(item.value)))
                        );
                        return;
                    case "siteLogo":
                        dispatch(
                            setWebsiteLogo(item.value)
                        );
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
