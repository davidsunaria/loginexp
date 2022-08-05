import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import { useStoreState } from "../store";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../utils/services";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  let navigate = useNavigate();
  const loginValue = useStoreState((state) => state?.authModel?.loginValue);
  const isLoggedOut = useStoreState((state) => state?.authModel?.isLoggedOut);

  useEffect(() => {
    if (loginValue) {
      
      navigate("/home/dashboard");
    }
  }, [loginValue]);

  console.log("islogged",loginValue)
  console.log("islogged out",isLoggedOut)
  useEffect(() => {
    if (isLoggedOut || isLogin()) {
      console.log("hijhew")
      navigate("/login");
    }
  }, [isLoggedOut]);

  return (
    <>
      {isLogin() && <Header />}
      {children}
    </>
  );
};

export default Layout;
