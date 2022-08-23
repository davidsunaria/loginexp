import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import CustomerHeader from "./CustomerHeader";
import { useStoreState, useStoreActions } from "../store";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../utils/services";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  let navigate = useNavigate();
  const loginValue = useStoreState((state) => state?.authModel?.loginValue);
  const isLoggedOut = useStoreState((state) => state?.authModel?.isLoggedOut);
  const isSignUp = useStoreState((state) => state?.authModel?.isSignUp);
  const accountType = useStoreState((state) => state?.authModel?.accountType);

  
  useEffect(() => {
    if (loginValue && accountType === "customer") {
      navigate("/homepage/about");
    }
    if (loginValue && accountType === "seller") {
      navigate("/home/dashboard");
    }
    if (!loginValue) {
      navigate("/login");
    }
  }, [loginValue]);

  useEffect(() => {
    if (isLoggedOut || isLogin()) {
      if (!loginValue) {
        navigate("/login");
      }
    }
  }, [isLoggedOut]);

  useEffect(() => {
    if (isSignUp) {
      navigate("/login");
    }
  }, [isSignUp]);

  return (
    <>
      {isLogin() && accountType === "seller" && <Header />}
      {isLogin() && accountType === "customer" && <CustomerHeader />}
      {children}
    </>
  );
};

export default Layout;
