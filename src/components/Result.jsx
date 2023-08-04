import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Result = () => {
  const [query, setQuery] = useState("");
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("movie");

  const header = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
  };

  useEffect(() => {
    setQuery(paramValue);
    setPage(0);
  }, [paramValue]);

  useEffect(() => {
    getResult();
  }, [page, query]);

  const getResult = async () => {
    const url = `${
      process.env.REACT_APP_BASE_URL
    }/search/movie?query=${query}&page=${page + 1}`;
    const response = await axios.get(url, header);
    setDatas(response.data.results);
    setPages(response.data.total_pages);
    setTotal(response.data.total_results);

    if (page > 500) {
      setPages(500);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const formDate = (date) => {
    const newDate = new Date(date);
    const opt = { year: "numeric" };
    return newDate.toLocaleDateString("en-US", opt);
  };

  return (
    <div className="col-lg-8">
      <div className="product__page__content">
        <div className="product__page__title">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-6">
              <div className="section-title">
                <h4>
                  {datas.length ? `${query} (${total} movies)` : "not found"}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {datas.length ? (
            datas.map((movie) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={movie.id}>
                <Link className="product__item" to={`/movie/${movie.id}`}>
                  <div className="product__item__pic set-bg">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`}
                      alt="poster"
                      className="pic"
                    />
                    <div className="ep">{`${movie.vote_average} / 10`}</div>
                  </div>
                  <div className="product__item__text">
                    <h5>
                      {movie.title} ({formDate(movie.release_date)})
                    </h5>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <h5 style={{ color: "white", paddingLeft: "20px" }}>
              I apologize, but currently, the film {query.toUpperCase()} is not
              available.
            </h5>
          )}
        </div>
      </div>
      {datas.length ? (
        <ReactPaginate
          previousLabel={<i className="fa fa-angle-double-left" />}
          nextLabel={<i className="fa fa-angle-double-right" />}
          pageCount={Math.min(500, pages)}
          onPageChange={changePage}
          containerClassName={"product__pagination"}
          activeLinkClassName={"current-page"}
          forcePage={page}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Result;
