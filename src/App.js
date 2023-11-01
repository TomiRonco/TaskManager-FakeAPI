import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import UserRegister from "./components/userRegister/UserRegister";
import DashBoard from "./components/dashboard/DashBoard";
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
      path: "/register",
      element: <UserRegister />,
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
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
