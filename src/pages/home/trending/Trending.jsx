import { useState } from "react";
import Container from "../../../components/container/Container";
import SwitchTabs from "../../../components/switch tabs/SwitchTabs";
import { useGetTrendingMoviesQuery } from "../../../features/homeslice/homeApiSlice";

import Carousel from "../../../components/carousel/Carousel";
import "../style.scss";
export default function Trending() {
  const [endpoint, setEndpoint] = useState("day");
  const {
    data: trendingMovies,
    isLoading,
    isError,
    error,
  } = useGetTrendingMoviesQuery(endpoint);

  const onTabChange = (tab) => {
    setEndpoint(tab.toLowerCase());
  };
  return (
    <section className="trendingSection">
      <Container>
        <div className="contentWrapper">
          <h4 className="carouselTitle">Trending</h4>
          <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </div>
        <Carousel
          isError={isError}
          error={error}
          data={trendingMovies?.results}
          isLoading={isLoading}
        />
      </Container>
    </section>
  );
}
