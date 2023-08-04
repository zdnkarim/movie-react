import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [datas, setDatas] = useState([]);
  const [time, setTime] = useState("day");

  useEffect(() => {
    getTrending();
  }, [time]);

  const getTrending = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/trending/movie/${time}`;
    const header = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    };
    const response = await axios.get(url, header);
    setDatas(response.data.results.slice(0, 8));
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-8">
      <div className="product__sidebar">
        <div className="product__sidebar__view">
          <div className="section-title">
            <h5>Trending Movies</h5>
          </div>
          {time === "day" ? (
            <ul className="filter__controls">
              <li className="active" onClick={(e) => setTime("day")}>
                Day
              </li>
              <li onClick={(e) => setTime("week")}>Week</li>
            </ul>
          ) : (
            <ul className="filter__controls">
              <li onClick={(e) => setTime("day")}>Day</li>
              <li className="active" onClick={(e) => setTime("week")}>
                Week
              </li>
            </ul>
          )}

          <div className="filter__gallery">
            {datas.map((data) => (
              <Link to={`/movie/${data.id}`}>
                <div className="product__sidebar__view__item set-bg mix day years">
                  <img
                    src={`${process.env.REACT_APP_IMAGE_URL}${data.backdrop_path}`}
                    alt="backdrop"
                    className="pic"
                  />
                  <div className="ep">{data.vote_average} / 10</div>
                  <h5>{data.title}</h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
