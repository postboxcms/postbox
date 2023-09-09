import { useSelector } from "react-redux";
import { getUser } from "../store/jwt";

export const isLogin = () => {
    const user = useSelector(getUser);
    return user !== undefined ? true : false;
};
