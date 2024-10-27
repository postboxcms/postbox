import React from "react";
import { useDispatch } from "react-redux";
import { setContentTypes } from "../modules/ContentType/reducers/contentTypes";
import { useAuthentication } from "../hooks/auth";

const DataProvider = ({children}) => {
    const auth = useAuthentication();
    const dispatch = useDispatch();

    React.useEffect(() => {
        // set content type data
        auth.get('/ContentType').then((response) => {
            dispatch(setContentTypes(response.data));
        });
    },[]);

    return (
        <React.Fragment>{children}</React.Fragment>
    )
}

export default DataProvider;