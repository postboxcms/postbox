import React from "react";

const UserInfo = ({ message }) => {
    return (
        <Panel
            style={{ padding: "16px", justifyContent: "center" }}
        >
            <p>{message}</p>
        </Panel>
    )
};

export default UserInfo;