import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const dispatch = useDispatch();
  const [trailer, setTrailer] = useState(null);
  // useMovieTrailer(movieId);
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
        setTrailer(trailer);  // ✅ Store trailer video ID in Redux state
        dispatch(addTrailerVideo(trailer));
      };
      getMovieVideos();
      console.log("-------",trailer);
    }, []);

  if (!trailer) return <div>No trailerVideo</div>; // Handle loading state

  return (
    <div className=" w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
export default VideoBackground;
