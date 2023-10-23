import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import MediaItem from "../MediaItem/MediaItem.jsx";

export default function TV() {
  const [tvData, setTvData] = useState([]);
  async function getTvData() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=6161aa80861351ec2aafa166ff23456b`
    );
    setTvData(data.results);
  }
  useEffect(() => {
    getTvData();
  }, []);
  return (
    <>
      {tvData.length ? (
        <div className="container">
          <div className="row py-5">
            <div className="col-md-4 d-flex align-items-center">
              <div className="media_type_title w-100">
                <div className="brdr w-25 mb-3"></div>
                <h4>
                  Trending <br /> TVs Show <br /> To watch now
                </h4>
                <p className="fw-lighter">Trending Tv Show In This Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {tvData.map((movie, index) => (
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
