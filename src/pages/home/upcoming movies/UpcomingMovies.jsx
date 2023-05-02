import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noPosterImg from "../../../assets/no-poster.png";
import CircleRating from "../../../components/circle rating/CircleRating";
import Container from "../../../components/container/Container";
import Genres from "../../../components/genres/Genres";
import { LazyImg } from "../../../components/lazyImage/LazyImg";
import { useGetMoviesByCategoryQuery } from "../../../features/homeslice/homeApiSlice";
import "../style.scss";
import "./style.scss";

export default function UpcomingMovies() {
  const { data: upcomingMovies, isLoading } =
    useGetMoviesByCategoryQuery("/upcoming");
  const navigate = useNavigate();
  const { poster } = useSelector((state) => state.url);

  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <span className="title skeleton"></span>
          <span className="date skeleton"> </span>
        </div>
      </div>
    );
  };

  return (
    <section className="trendingSection">
      <Container>
        <div className="contentWrapper">
          <h4 className="carouselTitle">Upcoming Movies</h4>
        </div>
        {!isLoading ? (
          <div className="upcomingMovies">
            {upcomingMovies?.results.map((itm) => {
              const posterUrl = itm?.poster_path
                ? poster + itm?.poster_path
                : noPosterImg;
              return (
                <div
                  onClick={() => navigate(`/movie/${itm?.id}`)}
                  className="upcomingMovie"
                  key={itm.id}
                >
                  <div className="posterBlock">
                    <LazyImg src={posterUrl} />
                    <CircleRating rating={itm?.vote_average.toFixed(1)} />
                    <Genres genreIds={itm?.genre_ids} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{itm?.title || itm?.name}</span>
                    <span className="date">
                      {dayjs(itm?.release_date).format("MMM D,YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </Container>
    </section>
  );
}
