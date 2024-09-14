import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import { routerGenerator } from "../utils/routerGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import Login from "../pages/Login";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routerGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: routerGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
    children: routerGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);

export default router;