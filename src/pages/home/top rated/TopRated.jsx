import { useState } from "react";
import Container from "../../../components/container/Container";
import SwitchTabs from "../../../components/switch tabs/SwitchTabs";
import { useGetTopRatedQuery } from "../../../features/homeslice/homeApiSlice";

import Carousel from "../../../components/carousel/Carousel";
import "../style.scss";
export default function TopRated() {
  const [media, setMedia] = useState("movie");
  const {
    data: topRatedMovies,
    isLoading,
    isError,
    error,
  } = useGetTopRatedQuery({
    media_type: media,
    endpoint: "top_rated",
  });

  const onTabChange = (tab) => {
    setMedia(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <section className="trendingSection">
      <Container>
        <div className="contentWrapper">
          <h4 className="carouselTitle">Top Rated</h4>
          <SwitchTabs data={["Movies", "TV shows"]} onTabChange={onTabChange} />
        </div>
        <Carousel
          isError={isError}
          error={error}
          media={media}
          data={topRatedMovies?.results}
          isLoading={isLoading}
        />
      </Container>
    </section>
  );
}
