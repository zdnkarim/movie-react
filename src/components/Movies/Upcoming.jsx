import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Upcoming = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  const getUpcomingMovies = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/movie/upcoming`;
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    };
    const response = await axios.get(url, header);
    setDatas(response.data.results.slice(0, 8));
  };

  return (
    <div className="trending__product">
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-8">
          <div className="section-title">
            <h4>Upcoming</h4>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="btn__all">
            <Link to="/categories/upcoming" className="primary-btn">
              View All <span className="arrow_right"></span>
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        {datas.map((data) => (
          <div className="col-lg-3 col-md-6 col-sm-6" key={data.id}>
            <Link className="product__item" to={`/movie/${data.id}`}>
              <div className="product__item__pic set-bg">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}${data.poster_path}`}
                  alt="poster"
                  className="pic"
                />
                <div className="ep">{`${data.vote_average} / 10`}</div>
              </div>
              <div className="product__item__text">
                <h5>
                  <h5>{data.title}</h5>
                </h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
