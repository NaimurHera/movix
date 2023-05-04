import { useParams } from "react-router-dom";
import {
  useGetCreditsQuery,
  useGetMediaVideosQuery,
} from "../../features/homeslice/homeApiSlice";
import Cast from "./cast/Cast";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import "./style.scss";
import VideosSection from "./videosSection/VideosSection";
export default function Details() {
  const { mediaType, id } = useParams();

  const { data: videos, isVideoLoading } = useGetMediaVideosQuery({
    media_type: mediaType,
    id,
  });
  const { data: credits, isLoading: isCreditsLoading } = useGetCreditsQuery({
    media_type: mediaType,
    id,
  });
  return (
    <>
      <DetailsBanner video={videos?.results[0]} crews={credits?.crew} />
      <Cast data={credits?.cast} loading={isCreditsLoading} />
      <VideosSection data={videos} loading={isVideoLoading} />
    </>
  );
}
