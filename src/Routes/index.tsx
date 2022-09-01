import React, { Suspense, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { isLogin } from "../utils/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layouts/Layout";

const LoginPage = React.lazy(() => import("../Pages/Auth"));
const SignUp = React.lazy(() => import("../Pages/SignUp"));
const Dashboard = React.lazy(() => import("../Pages/Dashboard"));
const Home = React.lazy(() => import("../Pages/Home"));
const UserData = React.lazy(() => import("../Pages/UserData"));
const Product = React.lazy(() => import("../Pages/Product"));
const HomePage = React.lazy(() => import("../Pages/HomePage"));
const About = React.lazy(() => import("../Pages/About"));
const Shop = React.lazy(() => import("../Pages/Shop"));
const ProductCategory = React.lazy(() => import("../Pages/ProductCategory"));

const AppRouter: React.FC = (): JSX.Element => {
  const PublicRoute = ({ children }: any) => {
    const auth = isLogin();
    return !auth ? children : <Navigate to="/home/dashboard" />;
  };

  function PrivateRoute({ children }: any) {
    const auth = isLogin();
    return auth ? children : <Navigate to="/login" />;
  }

  return (
    <Layout>
      <ToastContainer />
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
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          <Route
            path="/homepage"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          >
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Shop />} />
          </Route>

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
            <Route path="ProductCategory" element={<ProductCategory />} />
            <Route path="product/:category" element={<Product />} />
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRouter;
