import { useHistory } from "react-router-dom";
import { api } from "../utils/constants";

export const useNavigation = () => {
    const history = useHistory();

    return (url) => {
        history.push(api.adminPrefix + url);
    }
}