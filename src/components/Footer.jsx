import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ logo }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer__logo">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footer__nav">
              <ul>
                <li className="active">
                  <Link to="/">Homepage</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <p>
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script>
              All rights reserved | This template is made with
              <i className="fa fa-heart" aria-hidden="true"></i> by
              <a href="https://colorlib.com">Colorlib</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
