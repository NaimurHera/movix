import dayjs from "dayjs";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import noPosterImg from "../../assets/no-poster.png";
import CircleRating from "../../components/circle rating/CircleRating";
import Container from "../../components/container/Container";
import Genres from "../../components/genres/Genres";
import { LazyImg } from "../../components/lazyImage/LazyImg";
import Spinner from "../../components/spinner/Spinner";
import { exploreApiSlice, useGetDiscoverMediaQuery } from "../../features/exploreSlice/exploreApiSlice";
import { useGetGenresQuery } from "../../features/homeslice/homeApiSlice";
import "./style.scss";

let filters = {};
const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

export default function Explore() {
  const { mediaType: paramsMediaType } = useParams();
  const media_Type = paramsMediaType === "movies" ? "movie" : "tv";
  const [selectedGenres, setSelectedGenres] = useState();
  const [selectedSortBy, setSelectedSortBy] = useState();
  // const [genre, setGenre] = useState();
  const { poster } = useSelector((state) => state.url);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const { data: genresData } = useGetGenresQuery(media_Type);
  const { data: mediaData, isLoading, isError, error } = useGetDiscoverMediaQuery(media_Type);
  const [data, setData] = useState();

  //cutomizing genres for react select
  const customizedGenres = genresData?.genres?.map((genre) => {
    return { id: genre.id, value: genre.name, label: genre.name };
  });

  const handleChange = (selectedItems, action) => {
    // if action name is "genres" and action.action isn't "clear" then add the selected items to the filter object
    if (action?.name === "genres") {
      setSelectedGenres(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        const genreIdString = genreId.join(", ");
        filters.with_genres = genreIdString;
      } else {
        delete filters.with_genres; // if action.action is "clear" then remove the with_genres property from filters object
      }
    }
    if (action?.name === "sortBy") {
      setSelectedSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value; // if action name is "sortby" and action.action isn't "clear" then add the selected items to the filter object
      } else {
        delete filters.sort_by; // else remove the sort_by property from the filters object
      }
    }
    setPageNumber(1);
  };

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

  useEffect(() => {
    // when pageNumber is greater than 1 then get new page data and push with old data
    if (pageNumber > 1) {
      dispatch(
        exploreApiSlice.endpoints.getMoreDiscoverMedia.initiate({
          media_Type,
          sort_by: filters.sort_by,
          with_genres: filters.with_genres,
          pageNumber,
        })
      ).then((res) => {
        setData((prevdata) => {
          return {
            ...prevdata,
            results: [...prevdata.results, ...res.data.results], // push the new data with the old data
          };
        });
      });
    }

    if (selectedSortBy || selectedGenres) {
      dispatch(
        exploreApiSlice.endpoints.getFilteredDiscoverMedia.initiate({
          media_Type,
          sort_by: filters.sort_by,
          with_genres: filters.with_genres,
        })
      ).then((res) => {
        if (res?.data?.total_pages <= pageNumber) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setData(res?.data);
      });
    }
  }, [pageNumber, dispatch, media_Type, selectedGenres, selectedSortBy]);

  // useEffect(() => {
  //   // whenever we make changes set the dispatched data to the data state
  //   if (selectedSortBy || selectedGenres) {
  //     dispatch(
  //       exploreApiSlice.endpoints.getFilteredDiscoverMedia.initiate({
  //         media_Type,
  //         sort_by: filters.sort_by,
  //         with_genres: filters.with_genres,
  //       })
  //     ).then((res) => {
  //       if (res?.data?.total_pages <= pageNumber) {
  //         setHasMore(false);
  //       } else {
  //         setHasMore(true);
  //       }
  //       setData(res?.data);
  //     });
  //   }
  // }, [selectedGenres, selectedSortBy, media_Type, dispatch, pageNumber]);

  useEffect(() => {
    // set the first initial data from the mediaData
    if (mediaData?.results) {
      setData(mediaData);
    }
  }, [mediaData]);

  useEffect(() => {
    filters = {};
    setSelectedGenres(null);
    setSelectedSortBy(null);
  }, [paramsMediaType]); // whenever paramsMediaType changes(that means we navigate to another page) empty previouse states

  return (
    <>
      <div className="explorePage">
        <Container>
          <div className="header-wrapper">
            <div className="title">Explore {paramsMediaType === "movies" ? "Movies" : "Tv shows"}</div>
            <div className="filtersWrapper">
              <Select
                isMulti
                name="genres"
                closeMenuOnSelect={false}
                options={customizedGenres}
                value={selectedGenres}
                placeholder="Select genres"
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
              />
              <Select
                placeholder="Sort by"
                name="sortBy"
                value={selectedSortBy}
                onChange={handleChange}
                options={sortbyData}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>

          {data?.results?.length === 0 && (
            <h2 className="resultNotFound">{`No result found for "${paramsMediaType}"`}</h2>
          )}

          {/*  if the data is not loading then show the content else show skeleton */}
          {!isLoading ? (
            <>
              {/*  if data isn't loading and there is no error then show content */}
              {!isLoading && !isError && data?.results && (
                <InfiniteScroll
                  dataLength={data?.results?.length || []}
                  next={handleShowmore}
                  hasMore={hasMore}
                  loader={<Spinner />}
                  endMessage={data.results.length > 0 && <span className="no-more-videos">No more videos!</span>}
                >
                  <div className="mediaResults">
                    {data?.results.map((itm, index) => {
                      const posterUrl = itm?.poster_path ? poster + itm?.poster_path : noPosterImg;
                      return (
                        <div onClick={() => navigate(`/${media_Type}/${itm?.id}`)} className="mediaResult" key={index}>
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
                  </div>
                </InfiniteScroll>
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
