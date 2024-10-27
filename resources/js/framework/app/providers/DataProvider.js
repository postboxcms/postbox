import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContentTypes } from "../modules/ContentType/reducers/contentTypes";
import { useAuthentication } from "../hooks/auth";
import { getToken } from "../modules/Auth/reducers/jwt";

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
    }, [token]);

    return <React.Fragment>{children}</React.Fragment>;
};

export default DataProvider;
