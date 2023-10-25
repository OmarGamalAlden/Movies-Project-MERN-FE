import { Helmet } from "react-helmet";
import MediaItem from "../MediaItem/MediaItem.jsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";

export default function Home({ trendingMovies, trendingTV, trendingPerson }) {
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <title> Home Page </title>
      </Helmet>
      {trendingMovies.length ? (
        <div className="container">
          {/* row about trending movies */}
          <div className="row py-5">
            <div className="col-md-4 d-flex align-items-center">
              <div className="media_type_title w-100">
                <div className="brdr w-25 mb-3"></div>
                <h4>
                  Trending <br /> Movies <br /> To watch now
                </h4>
                <p className="fw-lighter">Most watched movies by days</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {trendingMovies.slice(0, 10).map((movie, index) => (
              <MediaItem key={index} item={movie} />
            ))}
          </div>

          {/* row about trending TV */}
          <div className="row py-5">
            <div className="col-md-4 d-flex align-items-center">
              <div className="media_type_title w-100">
                <div className="brdr w-25 mb-3"></div>
                <h4>
                  Trending <br /> TV <br /> To watch now
                </h4>
                <p className="fw-lighter">Most watched TVs by days</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {trendingTV.slice(0, 10).map((tv, index) => (
              <MediaItem key={index} item={tv} />
            ))}
          </div>

          {/* row about trending persons */}
          <div className="row py-5">
            <div className="col-md-4 d-flex align-items-center">
              <div className="media_type_title w-100">
                <div className="brdr w-25 mb-3"></div>
                <h4>
                  Trending <br /> Persons <br /> To know about!!
                </h4>
                <p className="fw-lighter">Most trending persons by days</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>
            {trendingPerson
              .filter((person) => person.profile_path != null)
              .slice(0, 10)
              .map((person, index) => (
                <MediaItem key={index} item={person} />
              ))}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
