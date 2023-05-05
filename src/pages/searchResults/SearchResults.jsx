import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import noPosterImg from "../../assets/no-poster.png";
import CircleRating from "../../components/circle rating/CircleRating";
import Container from "../../components/container/Container";
import Genres from "../../components/genres/Genres";
import { LazyImg } from "../../components/lazyImage/LazyImg";
import {
  searchResultsApiSlice,
  useGetSearchResultsQuery,
} from "../../features/searchResultsSlice/searchResultsApiSlice";
import "./style.scss";

export default function SearchResults() {
  const [pageNumber, setPageNumber] = useState(1);
  const { query } = useParams();
  const { poster } = useSelector((state) => state.url);
  const { data: searchResults, isLoading, isError, error } = useGetSearchResultsQuery(query);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // if there is no more page then set the hasmore false
    if (searchResults?.total_pages <= pageNumber) {
      setHasMore(false);
    }
    if (pageNumber > 1) {
      dispatch(
        searchResultsApiSlice.endpoints.getMoreSearchResults.initiate({
          query,
          pageNumber,
        })
      ).then(() => {
        setLoading(false);
      });
    }
  }, [pageNumber, dispatch, query, searchResults?.total_pages]);

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
    setPageNumber((prevNumber) => prevNumber + 1);
    setLoading(true);
  };

  return (
    <>
      <div className="searchResultsPage">
        <Container>
          {searchResults?.results?.length > 0 && <h2 className="pageTitle">{`Search Results of '${query}'`}</h2>}
          {searchResults?.results?.length === 0 && (
            <h2 className="resultNotFound">{`No result found for ${query}'`}</h2>
          )}

          {/*  if the data is not loading then show the content else show skeleton */}
          {!isLoading ? (
            <>
              {/*  if data isn't loading and there is no error then show content */}
              {!isLoading && !isError && searchResults?.results && (
                <div className="searchResults">
                  {searchResults?.results.map((itm) => {
                    const posterUrl = itm?.poster_path ? poster + itm?.poster_path : noPosterImg;
                    return (
                      <div
                        onClick={() => navigate(`/${itm?.media_type}/${itm?.id}`)}
                        className="searchResult"
                        key={itm.id}
                      >
                        <div className="posterBlock">
                          <LazyImg src={posterUrl} />
                          <CircleRating rating={itm?.vote_average?.toFixed(1)} />
                          <Genres genreIds={itm?.genre_ids} />
                        </div>
                        <div className="textBlock">
                          <span className="title">{itm?.title || itm?.name}</span>
                          <span className="date">{dayjs(itm?.release_date).format("MMM D,YYYY")}</span>
                        </div>
                      </div>
                    );
                  })}
                  {/* show the button below if there is more video  */}
                  {hasMore && (
                    <button disabled={loading} onClick={handleShowmore} className="show-more-btn">
                      {loading ? "Loading movies..." : "Show more"}
                    </button>
                  )}
                  {/* show the text below if there is no more video  */}
                  {!hasMore && <span className="no-more-videos">No more videos!</span>}
                </div>
              )}
              {/*  if data isn't loading but there is an error occured then show the error message*/}
              {!isLoading && isError && <div className="error">{error}</div>}
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
      </div>
    </>
  );
}
