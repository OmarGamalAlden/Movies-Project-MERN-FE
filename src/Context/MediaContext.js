import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MediaContext = createContext(null);
export default function MediaContextProvider(props) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);
  async function getTrending(mediaType, callback) {
    //just one function to call api
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=6161aa80861351ec2aafa166ff23456b`
    );
    callback(data.results);
  }
  useEffect(() => {
    getTrending("movie", setTrendingMovies); //call api for trending movies...
    getTrending("tv", setTrendingTV);
    getTrending("person", setTrendingPerson);
  }, []);
  return (
    <MediaContext.Provider
      value={{ trendingMovies, trendingTV, trendingPerson }}
    >
      {props.children}
    </MediaContext.Provider>
  );
}
