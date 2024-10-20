import React from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../../utils";
import Text from "../../../ui/components/Text";

const AddEditContent = () => {
    const location = useLocation();
    const relativePath = location.pathname.replace(api.adminPrefix,'');
    const contentType = relativePath.replace('/edit','').replace('/add','').replace('/','');
    const contentTypeName = contentType.charAt(0).toUpperCase().concat(contentType.slice(1,contentType.length));

    return (
        <React.Fragment>
            <Text title={`Add a ${contentTypeName.toLowerCase()}`}></Text>
        </React.Fragment>
    )
    // return (<>Add or edit <b>{contentTypeName}</b></>)
}

export default AddEditContent;