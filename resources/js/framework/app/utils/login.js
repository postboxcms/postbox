import { useSelector } from "react-redux";
import { getUser } from "../modules/Auth/reducers/jwt";

export const isLogin = () => {
    const user = useSelector(getUser);
    return user !== undefined && user !== null;
};
