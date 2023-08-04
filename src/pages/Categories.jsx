import React from "react";
import Layout from "../pages/Layout";
import CategoriesPage from "../components/CategoriesPage";
import Sidebar from "../components/Sidebar";

const Categories = () => {
  return (
    <Layout>
      <CategoriesPage />
      <Sidebar />
    </Layout>
  );
};

export default Categories;
