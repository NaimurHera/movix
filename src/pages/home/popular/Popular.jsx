import { useState } from "react";
import Container from "../../../components/container/Container";
import SwitchTabs from "../../../components/switch tabs/SwitchTabs";
import { useGetPopularQuery } from "../../../features/homeslice/homeApiSlice";

import Carousel from "../../../components/carousel/Carousel";
import "../style.scss";
export default function Popular() {
  const [media, setMedia] = useState("movie");
  const { data: popularMovies, isLoading } = useGetPopularQuery({
    media_type: media,
    endpoint: "popular",
  });

  const onTabChange = (tab) => {
    setMedia(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <section className="trendingSection">
      <Container>
        <div className="contentWrapper">
          <h4 className="carouselTitle">Popular</h4>
          <SwitchTabs data={["Movies", "TV shows"]} onTabChange={onTabChange} />
        </div>
        <Carousel
          media={media}
          data={popularMovies?.results}
          isLoading={isLoading}
        />
      </Container>
    </section>
  );
}
