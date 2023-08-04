import React from "react";
import Layout from "./Layout";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";

const Index = () => {
  return (
    <Layout>
      <Home />
      <Sidebar />
    </Layout>
  );
};

export default Index;
