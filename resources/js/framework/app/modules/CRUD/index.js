import React from "react";
import { Card, Frame } from "../../ui/layout/Frame";
import { useAuthentication } from "../../hooks/auth";
import Body from "./Body";

const CRUD = (props) => {
    const [data, setData] = React.useState({});
    const auth = useAuthentication();

    React.useEffect(() => {
        auth.get("/CRUD").then((response) => setData(response.data));
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