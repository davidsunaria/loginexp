import React from "react";
import {  Outlet} from "react-router-dom";

const HomePage = () => {
 
 console.log("homeapge")
  return (
    <>
     <Outlet /> 
     </>
  );
};

export default HomePage;
