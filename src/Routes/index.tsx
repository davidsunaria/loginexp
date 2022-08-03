import React, { Suspense } from "react";
import { Route, Routes,  Navigate } from "react-router-dom";
import { isLogin } from "../utils/services";
import { useStoreState,useStoreActions } from '../store';
const LoginPage = React.lazy(() => import("../Pages/Auth"));
const Dashboard = React.lazy(() => import("../Pages/Dashboard"));
const Home = React.lazy(() => import("../Pages/Home"));
const UserData = React.lazy(() => import("../Pages/UserData"));


const AppRouter: React.FC = (): JSX.Element => {

  const loginValue = useStoreState((state) => state?.authModel?.loginValue);

  const PublicRoute = ({ children }: any) => {
    const auth = isLogin();
    return !auth && !loginValue ? children : <Navigate to="/home/dashboard" />;
  };

  function PrivateRoute({ children }: any) {
    const auth = isLogin();
    return auth && loginValue? children : <Navigate to="/login" />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userdata" element={<UserData />} />
        </Route>
      </Routes> */}

      <Routes>
      <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userdata" element={<UserData />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
