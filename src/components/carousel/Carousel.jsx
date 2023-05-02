import dayjs from "dayjs";
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import noPosterImg from "../../assets/no-poster.png";
import CircleRating from "../circle rating/CircleRating";
import Container from "../container/Container";
import Genres from "../genres/Genres";
import { LazyImg } from "../lazyImage/LazyImg";
import "./style.scss";
export default function Carousel({ data, isLoading, media }) {
  const carouselContainer = useRef();
  const navigate = useNavigate();
  const { poster } = useSelector((state) => state.url);

  const navigation = (direction) => {
    const container = carouselContainer?.current;
    const scrollAmount =
      direction === "right"
        ? container?.scrollLeft + container.offsetWidth + 20
        : container?.scrollLeft - container.offsetWidth - 20;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
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

  return (
    <div className="carousel">
      <Container>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!isLoading ? (
          <div ref={carouselContainer} className="carouselItems">
            {data?.map((itm) => {
              const posterUrl = itm?.poster_path
                ? poster + itm?.poster_path
                : noPosterImg;
              return (
                <div
                  onClick={() =>
                    navigate(`/${itm?.media_type || media}/${itm?.id}`)
                  }
                  className="carouselItem"
                  key={itm.id}
                >
                  <div className="posterBlock">
                    <LazyImg src={posterUrl} />
                    <CircleRating rating={itm?.vote_average.toFixed(1)} />
                    <Genres genreIds={itm?.genre_ids} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{itm?.title || itm?.name}</span>
                    <span className="date">
                      {dayjs(itm?.release_date).format("MMM D,YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </Container>
    </div>
  );
}
