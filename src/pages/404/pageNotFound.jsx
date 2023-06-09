import { AiFillHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import { LazyImg } from "../../components/lazyImage/LazyImg";
import { useGetMoviesByCategoryQuery } from "../../features/homeslice/homeApiSlice";
import "./style.scss";
export default function PageNotFound() {
  const { data: upcomingMovies } = useGetMoviesByCategoryQuery("/upcoming");

  const { backdrop } = useSelector((state) => state.url);

  // getting a random background url from the upcoming movies
  const bg = upcomingMovies?.results[Math.floor(Math.random() * upcomingMovies?.results.length)].backdrop_path;

  return (
    <div className="pageNotFoundPage">
      {backdrop && (
        <div className="backdrop-img">
          <LazyImg className={"heroBannerImg"} src={backdrop + bg} />
        </div>
      )}
      <Container>
        <div className="content">
          <h2 className="errorCode">404</h2>
          <h2>Page not found</h2>
          <Link to="/" className="backBtn">
            <AiFillHome /> Back to home
          </Link>
        </div>
      </Container>
      <div className="gradient-layer"></div>
    </div>
  );
}
