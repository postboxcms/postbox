import Dashboard from "../app/modules/Dashboard";
import CRUD from "../app/modules/CRUD";

const routes = [
    {
        dashboard: {
            path: "/",
            title: "",
            icon: "",
            controller: Dashboard,
        },
        crud: {
            path: "/crud",
            title: "CRUD",
            icon: "layer-group",
            controller: CRUD
        }
    },
];

export default routes;
