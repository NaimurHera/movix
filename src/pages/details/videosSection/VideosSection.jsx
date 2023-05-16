import { useState } from "react";

import "./style.scss";

import Container from "../../../components/container/Container";
import { LazyImg } from "../../../components/lazyImage/LazyImg";
import { PlayIcon } from "../../../components/playBtn/PlayIcon";
import VideoPopup from "../../../components/video popup/VideoPopup";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <Container>
        <div className="sectionHeading">Official Videos</div>
        {/* if data loading then show skeleton else show content  */}
        {!loading ? (
          <>
            {data?.results?.length > 0 && (
              <div className="videos">
                {data?.results?.map((video) => (
                  <div
                    onClick={() => {
                      setVideoId(video?.key);
                      setShow(true);
                    }}
                    key={video?.id}
                    className="videoItem"
                  >
                    <div className="videoThumbnail">
                      <LazyImg src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`} />
                      <PlayIcon />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {data?.results?.length === 0 && <div className="noVideosText">No official videos found!</div>}
          </>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </Container>
      <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
    </div>
  );
};
export default VideosSection;
