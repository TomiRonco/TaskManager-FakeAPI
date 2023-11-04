import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import UserRegister from "./components/userRegister/UserRegister";
import DashBoard from "./components/dashboard/DashBoard";
import PageNotFound from "./components/security/pageNotFound/PageNotFound";
import AllTasks from "./components/allTasks/AllTasks";
import NewTask from "./components/newTask/NewTask";
import UserList from "./components/userList/UserList";
import ProtectedSuperAdmin from "./components/security/protectedSuperAdmin/ProtectedSuperAdmin";
import ProtectedAdmin from "./components/security/protectedAdmin/ProtectedAdmin";
import PageNotAuthorize from "./components/security/pageNotAuthorized/PageNotAuthorize";
import ProtectedHome from "./components/security/pretectedHome/ProtectedHome";

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
      path: "/register",
      element: <UserRegister />,
    },
    {
      path: "/home",
      element: (
        <ProtectedHome>
          <DashBoard>
            <Outlet />
          </DashBoard>
        </ProtectedHome>
      ),
      children: [
        {
          path: "userList",
          element: (
            <ProtectedSuperAdmin>
              <UserList />
            </ProtectedSuperAdmin>
          ),
        },
        {
          path: "listTask",
          element: <AllTasks />,
        },
        {
          path: "addTask",
          element: (
            <ProtectedAdmin>
              <NewTask />
            </ProtectedAdmin>
          ),
        },
      ],
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
    {
      path: "/pageNotAuthorized",
      element: <PageNotAuthorize />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
