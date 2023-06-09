import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import avatar from "../../../assets/avatar.png";
import fallbackPoster from "../../../assets/no-poster.png";
import CircleRating from "../../../components/circle rating/CircleRating";
import Container from "../../../components/container/Container";
import Genres from "../../../components/genres/Genres";
import { LazyImg } from "../../../components/lazyImage/LazyImg";
import { PlayIcon } from "../../../components/playBtn/PlayIcon";
import VideoPopup from "../../../components/video popup/VideoPopup";
import { useGetDetailsQuery } from "../../../features/detailsSlice/detailsApiSlice";
export default function DetailsBanner({ video, crews }) {
  const { backdrop, poster, profile } = useSelector((state) => state.url);
  const { mediaType, id } = useParams();
  const { data: mediaDetails, isLoading } = useGetDetailsQuery({
    media_type: mediaType,
    id,
  });
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // get ids only from the genres of the media. Since we already have a component to get genres which only need ids
  const genreIds = mediaDetails?.genres.map((g) => g?.id);

  // convert minutes to hour and minute
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const directors = crews?.filter((crew) => crew.job === "Director");
  const writers = crews?.filter((crew) => crew.job === "Writer" || crew.job === "Screenplay" || crew.job === "Story");

  const playVideo = () => {
    setShow(true);
    setVideoId(video?.key);
  };

  return (
    <div className="detailsBanner">
      {!isLoading ? (
        // if not loading then show the mediaDetails
        <>
          {mediaDetails && (
            <>
              <div className="backdrop-img">
                <LazyImg src={backdrop + mediaDetails?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <Container>
                <div className="content">
                  <div className="left">
                    {/* if poster path available then show poster else show fall back img  */}
                    {mediaDetails?.poster_path ? (
                      <LazyImg className="posterImg" src={profile + mediaDetails.poster_path} />
                    ) : (
                      <div>
                        <LazyImg className="posterImg" src={fallbackPoster} />
                      </div>
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${mediaDetails?.name || mediaDetails?.title} ${dayjs(mediaDetails?.release_date).format(
                        "YYYY"
                      )} `}
                    </div>
                    <div className="subtitle">{mediaDetails?.tagline}</div>
                    <Genres genreIds={genreIds} />

                    <div className="row">
                      <CircleRating rating={mediaDetails?.vote_average.toFixed(1)} />
                      <div className="playbtn" onClick={playVideo}>
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <span className="description">{mediaDetails?.overview}</span>
                    </div>
                    <div className="info">
                      {mediaDetails?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status : </span>
                          <div className="span text">{mediaDetails?.status}</div>
                        </div>
                      )}
                      {mediaDetails?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date : </span>
                          <div className="span text">{dayjs(mediaDetails?.release_date).format("MMM D, YYYY")}</div>
                        </div>
                      )}
                      {mediaDetails?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime : </span>
                          <div className="span text">{toHoursAndMinutes(mediaDetails?.runtime)}</div>
                        </div>
                      )}
                    </div>
                    {directors?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {directors?.map((d, i) => (
                            <div key={i}>
                              <span className="profile">
                                {/* if profile path exist then show original image else show local avatar image*/}
                                {d?.profile_path ? (
                                  <LazyImg className={"profileImg"} src={poster + d?.profile_path} />
                                ) : (
                                  <LazyImg className={"profileImg"} src={avatar} />
                                )}
                              </span>
                              <span>
                                {d?.name}
                                {i < directors.length - 1 ? ", " : ""}
                              </span>
                            </div>
                          ))}
                        </span>
                      </div>
                    )}
                    {writers?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writers: </span>
                        <span className="text">
                          {writers?.map((r, i) => (
                            <div key={i}>
                              <span className="profile">
                                {/* if profile path exist then show original image else show local avatar image*/}
                                {r?.profile_path ? (
                                  <LazyImg className={"profileImg"} src={poster + r?.profile_path} />
                                ) : (
                                  <LazyImg className={"profileImg"} src={avatar} />
                                )}
                              </span>
                              <span>
                                {r?.name}
                                {i < writers.length - 1 ? ", " : ""}
                              </span>
                            </div>
                          ))}
                        </span>
                      </div>
                    )}
                    {mediaDetails?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creators: </span>
                        <span className="text">
                          {mediaDetails?.created_by?.map((c, i) => (
                            <div key={i}>
                              <span className="profile">
                                {/* if profile path exist then show original image else show local avatar image*/}
                                {c?.profile_path ? (
                                  <LazyImg className={"profileImg"} src={poster + c?.profile_path} />
                                ) : (
                                  <LazyImg className={"profileImg"} src={avatar} />
                                )}
                              </span>
                              <span>
                                {c?.name}
                                {i < mediaDetails?.created_by?.length - 1 ? ", " : ""}
                              </span>
                            </div>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup show={show} videoId={videoId} setShow={setShow} setVideoId={setVideoId} />
              </Container>
            </>
          )}
        </>
      ) : (
        // if loading then show the skeleton effect
        <div className="detailsBannerSkeleton">
          <Container>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
