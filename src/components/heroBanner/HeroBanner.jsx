import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetApiConfigurationQuery,
  useGetMoviesByCategoryQuery,
} from "../../features/homeslice/homeApiSlice";
import { setUrl } from "../../features/homeslice/urlSlice";
import Container from "../container/Container";
import { LazyImg } from "../lazyImage/LazyImg";
import "./style.scss";

export default function HeroBanner() {
  const navigate = useNavigate();
  const searchInput = useRef();
  const { data: upcomingMovies } = useGetMoviesByCategoryQuery("/upcoming");

  const { backdrop } = useSelector((state) => state.url);
  const { data: Apiconfiguration } = useGetApiConfigurationQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    // getting a random background url from the upcoming movies
    const bg =
      upcomingMovies?.results[
        Math.floor(Math.random() * upcomingMovies?.results.length)
      ].backdrop_path;
    // setting the backdrop state with apiconfig and random url
    if (bg) {
      const url = {
        profile: Apiconfiguration?.images?.secure_base_url + "original",
        poster: Apiconfiguration?.images?.secure_base_url + "original",
        backdrop: Apiconfiguration?.images?.secure_base_url + "original" + bg,
      };
      dispatch(setUrl(url));
    }
  }, [upcomingMovies, Apiconfiguration, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = searchInput.current.value;
    if (searchValue.length > 0) {
      navigate(`/search/${searchValue}`);
    }
  };

  return (
    <div className="heroBanner">
      {backdrop && (
        <div className="backdrop-img">
          <LazyImg src={backdrop} />
        </div>
      )}
      <div className="gradient-layer"></div>
      <Container>
        <div className="bannerContent">
          <h2 className="title">Welcome</h2>
          <p className="subTitle">
            Millions of movies and tv shows and people to discover. Explore now.
          </p>
          <div className="searchInput">
            <form onSubmit={handleSearch}>
              <input
                required
                ref={searchInput}
                type="text"
                placeholder="Search for a movie or tv shows.."
              />
              <button type="submit" className="searchButton">
                Search
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
