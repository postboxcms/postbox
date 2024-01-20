import Dashboard from "../../modules/Dashboard";
import CRUD from "../../modules/CRUD";
import { api } from "../../utils/constants";

const routes = [
    {
        dashboard: {
            path: api.adminPrefix + "/",
            title: "",
            icon: "",
            controller: Dashboard,
        },
        crud: {
            path: api.adminPrefix + "/crud",
            title: "CRUD",
            icon: "layer-group",
            controller: CRUD
        }
    },
];

export default routes;
