import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

const CategoriesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [genre, setGenre] = useState("");

  const header = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
  };

  const params = useParams();

  const location = useLocation();

  useEffect(() => {
    setPage(0);
    getGenreByID();
  }, [location]);

  useEffect(() => {
    getMovies();
  }, [page, movies]);

  const getGenreByID = async () => {
    if (
      params.categories === "popular" ||
      params.categories === "upcoming" ||
      params.categories === "top_rated"
    ) {
      const name = params.categories.split("_").join(" ");
      setGenre(name);
    } else {
      const url = `${process.env.REACT_APP_BASE_URL}/genre/movie/list`;
      const response = await axios.get(url, header);
      const getGenreName = response.data.genres.find(
        (e) => Number(params.categories) === e.id
      );
      setGenre(getGenreName.name);
    }
  };

  const getUrl = () => {
    if (
      params.categories === "popular" ||
      params.categories === "upcoming" ||
      params.categories === "top_rated"
    )
      return `${process.env.REACT_APP_BASE_URL}/movie/${
        params.categories
      }?page=${page + 1}`;

    return `${process.env.REACT_APP_BASE_URL}/discover/movie?with_genres=${
      params.categories
    }&page=${page + 1}`;
  };

  const getMovies = async () => {
    const url = getUrl();
    const response = await axios.get(url, header);
    setMovies(response.data.results);
    setPages(response.data.total_pages);

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
                <h4>{genre}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {movies.map((movie) => (
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
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={<i className="fa fa-angle-double-left" />}
        nextLabel={<i className="fa fa-angle-double-right" />}
        pageCount={Math.min(500, pages)}
        onPageChange={changePage}
        containerClassName={"product__pagination"}
        activeLinkClassName={"current-page"}
        forcePage={page}
      />
    </div>
  );
};

export default CategoriesPage;
