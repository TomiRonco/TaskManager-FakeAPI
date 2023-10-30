import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login";
import DashBoard from "./components/dashboard/DashBoard";
import Register from "./components/register/Register";
import NewTask from "./components/newTask/NewTask";
import AllTasks from "./components/allTasks/AllTasks";
import ComboLanguage from "./components/ui/comboLanguage/ComboLanguage";
import Task from "./components/task/Task";
import Protected from "./components/security/protected/Protected";
import PageNotFound from "./components/security/pageNotFound/PageNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: (
        <Protected>
          <DashBoard />
        </Protected>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/newTask",
      element: <NewTask />,
    },
    {
      path: "/allTasks",
      element: <AllTasks />,
    },
    {
      path: "/combo",
      element: <ComboLanguage />,
    },
    {
      path: "/task",
      element: <Task />,
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <div className="h-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
