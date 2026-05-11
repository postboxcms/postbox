import { useSelector } from "react-redux";
import { getUser } from "@modules/auth/reducers/user";

export const isLogin = () => {
    const user = useSelector(getUser);
    return user !== undefined && user !== null;
};
