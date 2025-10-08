import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Frame } from "@ui/layout/Frame";
import { useAuth } from "@app/hooks";
import { loadCRUD } from "@app/modules/CRUD/reducers/crud";
import Body from "./components/Body";

const CRUD = (props) => {
    const entityList = useSelector(state => state.crud.data);
    const isEntityLoaded = entityList?.entities?.length > 0;
    const [data, setData] = React.useState(entityList);
    const { path } = props;
    const dispatch = useDispatch();
    const { token } = useAuth();

    React.useEffect(() => {
        dispatch(loadCRUD({ path: "", token: token }));
        setData(entityList);
    }, [path, isEntityLoaded]);

    return (
        <Frame>
            <Card xs={12}>
                <Body {...props} {...data} />
            </Card>
        </Frame>
    );
}

export default CRUD;