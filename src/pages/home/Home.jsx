import HeroBanner from "../../components/heroBanner/HeroBanner";
import Popular from "./popular/Popular";
import "./style.scss";
import TopRated from "./top rated/TopRated";
import Trending from "./trending/Trending";
import UpcomingMovies from "./upcoming-movies/UpcomingMovies";
export default function Home() {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      <UpcomingMovies />
    </div>
  );
}
