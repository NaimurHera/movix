import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noPosterImg from "../../../assets/no-poster.png";
import CircleRating from "../../../components/circle rating/CircleRating";
import Container from "../../../components/container/Container";
import Genres from "../../../components/genres/Genres";
import { LazyImg } from "../../../components/lazyImage/LazyImg";
import {
  homeApiSlice,
  useGetMoviesByCategoryQuery,
} from "../../../features/homeslice/homeApiSlice";
import "../style.scss";
import "./style.scss";

export default function UpcomingMovies() {
  const {
    data: upcomingMovies,
    isLoading,
    isError,
    error,
  } = useGetMoviesByCategoryQuery("upcoming");
  const navigate = useNavigate();
  const { poster } = useSelector((state) => state.url);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handleShowmore = () => {
    setPage((prevpage) => prevpage + 1);
    setLoading(true);
  };

  useEffect(() => {
    // if there is no more page then set the hasmore false
    if (upcomingMovies?.total_pages <= page) {
      setHasMore(false);
    }
    // if page is greater than 1 and less then total page then get more upcoming movies
    if (page > 1 && page <= upcomingMovies?.total_pages) {
      dispatch(
        homeApiSlice.endpoints.getMoreUpcomingMovies.initiate({
          category: "upcoming",
          page,
        })
      ).then(() => {
        setLoading(false);
      });
    }
  }, [page, dispatch, hasMore, upcomingMovies?.total_pages]);
  return (
    <section className="upcomingSection">
      <Container>
        <div className="contentWrapper">
          <h4 className="carouselTitle">Upcoming Movies</h4>
        </div>
        {/*  if the data is not loading then show the content else show skeleton */}
        {!isLoading ? (
          <>
            {/*  if data isn't loading and there is no error then show content */}
            {!isLoading && !isError && upcomingMovies?.results && (
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
                {/* show the button below if there is more video  */}
                {hasMore && (
                  <button
                    disabled={loading}
                    onClick={handleShowmore}
                    className="show-more-btn"
                  >
                    {loading ? "Loading movies..." : "Show more"}
                  </button>
                )}
                {/* show the text below if there is no more video  */}
                {!hasMore && (
                  <span className="no-more-videos">No more videos!</span>
                )}
              </div>
            )}
            {/*  if data isn't loading but there is an error occured then show the error message*/}
            {!isLoading && isError && (
              <div className="upcomingMovies">{error}</div>
            )}
          </>
        ) : (
          // show the skeleton preview if the videos are loading
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
