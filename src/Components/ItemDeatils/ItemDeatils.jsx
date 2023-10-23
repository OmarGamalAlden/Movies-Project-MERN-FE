import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import { Helmet } from "react-helmet";

export default function ItemDeatils() {
  const [itemInfo, setItemInfo] = useState(null);
  let { mediaType, id } = useParams();
  async function getItemInfo(id, mediaType) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=6161aa80861351ec2aafa166ff23456b&language=en-US`
    );
    setItemInfo(data);
  }
  useEffect(() => {
    getItemInfo(id, mediaType);
  }, []);
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <title> Deatils Page </title>
      </Helmet>
      {itemInfo != null ? (
        <div className="container">
          <div className="row py-3">
            <div className="col-md-4">
              <div className="item_deatils_image w-100">
                <img
                  src={
                    itemInfo.poster_path
                      ? "https://image.tmdb.org/t/p/w500/" +
                        itemInfo.poster_path
                      : "https://image.tmdb.org/t/p/w500/" +
                        itemInfo.profile_path
                  }
                  alt="Profile Image"
                  className="w-100"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="item_deatils">
                <h3>{itemInfo.title || itemInfo.name}</h3>
                <p className="text-white-50">{itemInfo.tagline}</p>
                <div className="genres d-flex mb-3">
                  {itemInfo.genres?.map((elem, index) => (
                    <span key={index} className="bg-info p-1 rounded-2 me-3 ">
                      {elem.name}
                    </span>
                  ))}
                </div>

                {itemInfo.vote_average ? (
                  <h5 className="my-4 h6 fs-6">
                    Vote: {itemInfo.vote_average.toFixed(1)}{" "}
                  </h5>
                ) : (
                  ""
                )}
                {itemInfo.vote_count ? (
                  <h5 className="my-4 h6 fs-6">
                    Vote Count: {itemInfo.vote_count}{" "}
                  </h5>
                ) : (
                  ""
                )}

                {itemInfo.place_of_birth ? (
                  <h5 className="my-4 h6 fs-6">
                    Place of birth: {itemInfo.place_of_birth}{" "}
                  </h5>
                ) : (
                  ""
                )}

                {itemInfo.birthday ? (
                  <h5 className="my-4 h6 fs-6">
                    Birthday: {itemInfo.birthday}{" "}
                  </h5>
                ) : (
                  ""
                )}

                <h5 className="my-4 h6 fs-6">
                  Popularity: {itemInfo.popularity}{" "}
                </h5>
                {itemInfo.release_date || itemInfo.last_air_date ? (
                  <h5 className="my-4 h6 fs-6">
                    Release Date:{" "}
                    {itemInfo.release_date || itemInfo.last_air_date}{" "}
                  </h5>
                ) : (
                  ""
                )}
                {itemInfo.overview ? (
                  <p className="my-5 text-white-50 fs-5 ">
                    {" "}
                    {itemInfo.overview}{" "}
                  </p>
                ) : (
                  ""
                )}

                {itemInfo.biography ? (
                  <p className="my-5 text-white-50 fs-5">
                    {" "}
                    {itemInfo.biography}{" "}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
