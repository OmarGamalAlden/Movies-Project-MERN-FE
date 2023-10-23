import React from "react";
import { Link } from "react-router-dom";

export default function MediaItem({ item }) {
  return (
    <>
      <div className="col-md-2 text-center">
        <Link to={`/itemdeatils/${item.media_type}/${item.id}`}>
          <div className="mediaItem position-relative">
            <img
              className="w-100"
              src={
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500/" + item.poster_path
                  : "https://image.tmdb.org/t/p/w500/" + item.profile_path
              }
              alt=""
            />
            <h6 className="mt-1">{item.title || item.name}</h6>
            {item.vote_average ? (
              <div className="average_vote position-absolute top-0 end-0 p-2">
                {item.vote_average.toFixed(1)}
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
      </div>
    </>
  );
}
