import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import MediaItem from "../MediaItem/MediaItem.jsx";
import { Helmet } from "react-helmet";

export default function Movies() {
  const [movieData, setMovieData] = useState([]);
  async function getMovieData() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=6161aa80861351ec2aafa166ff23456b`
    );
    setMovieData(data.results);
  }
  useEffect(() => {
    getMovieData();
  }, []);
  return (
    <>
    <Helmet>
        <meta charset="utf-8" />
        <title> Movies Page </title>
      </Helmet>
      {movieData.length ? (
        <div className="container">
          <div className="row py-5">
            <div className="col-md-4 d-flex align-items-center">
              <div className="media_type_title w-100">
                <div className="brdr w-25 mb-3"></div>
                <h4>
                  Trending <br /> Movies <br /> To watch now
                </h4>
                <p className="fw-lighter">Trending Movies In This Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {movieData.map((movie, index) => (
              <MediaItem key={index} item={movie} />
            ))}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
