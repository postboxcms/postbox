import React from "react";
// layout
import { Card, Frame } from "@ui/components/layout/Frame";
import Body from "./components/Body";

export const Entity = (props) => {
    return (
        <Frame>
            <Card xs={12}>
                <Body {...props} />
            </Card>
        </Frame>
    );
}

export default Entity;