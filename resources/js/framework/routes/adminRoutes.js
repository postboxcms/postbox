import Dashboard from "../app/modules/Dashboard";
import CRUD from "../app/modules/CRUD";
import { api } from "../app/libs/constants";

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
