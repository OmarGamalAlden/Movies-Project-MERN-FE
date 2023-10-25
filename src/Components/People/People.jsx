import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import MediaItem from "../MediaItem/MediaItem.jsx";
import { Helmet } from "react-helmet";

export default function People({ trendingPerson }) {
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <title> People Page </title>
      </Helmet>
      {trendingPerson.length ? (
        <div className="container">
          <div className="row py-5">
            <div className="col-md-4 d-flex align-items-center">
              <div className="media_type_title w-100">
                <div className="brdr w-25 mb-3"></div>
                <h4>
                  Trending <br /> Pesrons <br /> To know about!!
                </h4>
                <p className="fw-lighter">Trending Persons In This Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {trendingPerson.map((movie, index) => (
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
