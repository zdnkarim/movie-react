import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../style/css/bootstrap.min.css";
import "../style/css/font-awesome.min.css";
import "../style/css/elegant-icons.css";
import "../style/css/plyr.css";
import "../style/css/nice-select.css";
import "../style/css/owl.carousel.min.css";
import "../style/css/slicknav.min.css";
import "../style/css/style.css";
import logo from "../style/img/logo.png";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar logo={logo} />
      <section className="product spad">
        <div className="container">
          <div className="row">{children}</div>
        </div>
      </section>

      <Footer logo={logo} />
    </React.Fragment>
  );
};

export default Layout;
