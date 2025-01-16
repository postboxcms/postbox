import React from "react";
import { Card, Frame } from "@ui/layout/Frame";
import { useSecureRoute } from "@app/hooks/route";
import Body from "./components/Body";

const CRUD = (props) => {
    const [data, setData] = React.useState({});
    const api = useSecureRoute();

    React.useEffect(() => {
        api.get("/crud").then((response) => setData(response.data));
    }, [props.path]);

    return (
        <Frame>
            <Card xs={12}>
                <Body {...props} {...data} />
            </Card>
        </Frame>
    );
}

export default CRUD;