import { useParams } from "react-router-dom";
import {
  useGetCreditsQuery,
  useGetMediaVideosQuery,
} from "../../features/homeslice/homeApiSlice";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import "./style.scss";
export default function Details() {
  const { mediaType, id } = useParams();

  const { data: videos, isLoading } = useGetMediaVideosQuery({
    media_type: mediaType,
    id,
  });
  const { data: credits, isLoading: isCreditsLoading } = useGetCreditsQuery({
    media_type: mediaType,
    id,
  });
  return <DetailsBanner video={videos?.results[0]} crews={credits?.crew} />;
}
