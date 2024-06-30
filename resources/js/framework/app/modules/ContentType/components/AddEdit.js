import React from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../../utils";

const AddEditContent = (props) => {
    const location = useLocation();
    const relativePath = location.pathname.replace(api.adminPrefix,'');
    const contentType = relativePath.replace('/edit','').replace('/add','');

    return (<>Add or edit <b>{contentType.replace('/','')}</b></>)
}

export default AddEditContent;