import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  console.log(trailerVideo);
   
  useEffect(() => {
    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
      console.log("Fetched Data:", json); // ✅ Check API response
  
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];

      console.log("Trailer Video:", trailer);  // ✅ Check trailer video ID
      dispatch(addTrailerVideo(trailer));
    };
    getMovieVideos();
    console.log("-------",trailerVideo);
  }, []);
};

export default useMovieTrailer;