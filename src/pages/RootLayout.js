import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function RootLayout() {
  return (
    <>
      <Header />
    </>
  );
}

export default RootLayout;
