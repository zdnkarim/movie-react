import React from "react";
import Layout from "./Layout";
import Result from "../components/Result";
import Sidebar from "../components/Sidebar";

const Search = () => {
  return (
    <Layout>
      <Result />
      <Sidebar />
    </Layout>
  );
};

export default Search;
