import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import { routerGenerator } from "../utils/routerGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routerGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routerGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routerGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;