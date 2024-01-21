import React from "react";
// layout
import { Card, Frame } from "../../ui/layout/Frame";
import Body from "./Body";

const ContentType = (props) => {
    return (
        <Frame>
            <Card xs={12}>
                <Body {...props} />
            </Card>
        </Frame>
    );
}

export default ContentType;