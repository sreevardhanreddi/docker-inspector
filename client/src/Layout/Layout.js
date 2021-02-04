import React from "react";
// import Navbar from "./../Components/Navbar/Navbar";

const Layout = (props) => {
  return (
    <>
      {/* <Navbar /> */}
      {props.children}
    </>
  );
};

export default Layout;
