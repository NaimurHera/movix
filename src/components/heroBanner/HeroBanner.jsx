import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/banner-placeholder.jpg";
import { useGetMoviesByCategoryQuery } from "../../features/homeslice/homeApiSlice";
import Container from "../container/Container";
import { LazyImg } from "../lazyImage/LazyImg";
import "./style.scss";

export default function HeroBanner() {
  const navigate = useNavigate();
  const searchInput = useRef();
  const { data: upcomingMovies, isError } =
    useGetMoviesByCategoryQuery("/upcoming");

  const { backdrop } = useSelector((state) => state.url);

  // getting a random background url from the upcoming movies
  const bg =
    upcomingMovies?.results[
      Math.floor(Math.random() * upcomingMovies?.results.length)
    ].backdrop_path;

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
          <LazyImg className={"heroBannerImg"} src={backdrop + bg} />
        </div>
      )}
      {/* adding local banner image if there is any error occured  */}
      {!backdrop && isError && (
        <div className="backdrop-img">
          <LazyImg className={"heroBannerImg"} src={bannerImg} />
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
