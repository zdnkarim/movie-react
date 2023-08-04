import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = ({ logo }) => {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("movie");

  useEffect(() => {
    getCategories();
    setKeyword(paramValue);
  }, [paramValue]);

  const getCategories = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/genre/movie/list`;
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    };
    const response = await axios.get(url, header);
    setCategories(response.data.genres);
  };

  const searchData = (e) => {
    e.preventDefault();
    navigate(`/search?movie=${query}`);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li>
                    <Link to="/">Homepage</Link>
                  </li>
                  <li>
                    <Link>
                      Categories <span className="arrow_carrot-down"></span>
                    </Link>
                    <ul className="dropdown">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link to={`/categories/${category.id}`}>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header__right h-100 d-flex align-items-center">
              <form className="search-model-form" onSubmit={searchData}>
                <input
                  type="text"
                  id="search-input"
                  placeholder={keyword ? keyword : "Search here....."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  style={{
                    "background-color": "transparent",
                    color: "white",
                    border: "none",
                  }}
                >
                  <span className="icon_search"></span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
};

export default Navbar;
