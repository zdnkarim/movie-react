import React, { useState, useEffect } from "react";
import avatar from "../style/img/user.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";

const MovieDetail = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState([]);
  const [desc, setDesc] = useState("");
  const [popularity, setPopularity] = useState(0);
  const [tagline, setTagline] = useState("");
  const [reviews, setReviews] = useState([]);
  const [video, setVideo] = useState("");
  const header = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
  };

  const opts = {
    height: "650",
    width: "100%",
  };

  useEffect(() => {
    getMovieDetail();
    getReview();
    getVideo();
  }, []);

  const getVideo = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/movie/${params.id}/videos`;
    const response = await axios.get(url, header);
    setVideo(response.data.results[0].key);
  };

  const getReview = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/movie/${params.id}/reviews`;

    const response = await axios.get(url, header);
    setReviews(response.data.results);
  };

  const avatarPath = (path) => {
    if (path) return `${process.env.REACT_APP_IMAGE_URL}${path}`;
    return avatar;
  };

  const getMovieDetail = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/movie/${params.id}`;
    const response = await axios.get(url, header);
    setTitle(response.data.title);
    setGenre(response.data.genres);
    setReleaseDate(response.data.release_date);
    setRate(response.data.vote_average);
    setStatus(response.data.status);
    setCompany(response.data.production_companies);
    setDesc(response.data.overview);
    setPopularity(response.data.popularity);
    setTagline(response.data.tagline);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return newDate.toLocaleDateString("en-US", options);
  };

  return (
    <div className="container">
      <div className="anime__details__content">
        <div className="row">
          <div className="col-lg-12">
            <div className="anime__video__player">
              <YouTube videoId={video} opts={opts} />
            </div>
            <div className="anime__details__text">
              <div className="anime__details__title">
                <h3>{title}</h3>
                <span>{tagline}</span>
              </div>
              <p>{desc}</p>
              <div className="anime__details__widget">
                <ul>
                  <li>
                    <span>Studios:</span>{" "}
                    {company.map((data) => data.name).join(", ")}
                  </li>

                  <li>
                    <span>Status:</span> {status}
                  </li>
                  <li>
                    <span>Genre:</span>{" "}
                    {genre.map((data) => data.name).join(", ")}
                  </li>

                  <li>
                    <span>Release Date:</span> {releaseDate}
                  </li>
                  <li>
                    <span>Rating:</span> {rate} / 10
                  </li>
                  <li>
                    <span>Popularity:</span> {popularity}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <div className="anime__details__review">
            <div className="section-title">
              <h5>Reviews</h5>
            </div>
            {reviews.map((review) => (
              <div className="anime__review__item">
                <div className="anime__review__item__pic">
                  <img
                    src={avatarPath(review.author_details.avatar_path)}
                    alt="avatar"
                  />
                </div>
                <div className="anime__review__item__text">
                  <h6>
                    {review.author} -{" "}
                    <span>{formatDate(review.created_at)}</span>
                  </h6>
                  <p>{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
