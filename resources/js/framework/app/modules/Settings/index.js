import React from "react";
import { Card, Frame } from "../../ui/layout/Frame";
import Body from "./components/Body";

const Settings = (props) => {
    return (
        <Frame>
            <Card xs={12}>
                <Body {...props} />
            </Card>
        </Frame>
    );
}

export default Settings;