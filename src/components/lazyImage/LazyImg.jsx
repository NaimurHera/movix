import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./style.scss";
export const LazyImg = ({ src }) => {
  return (
    <LazyLoadImage className={"heroBannerImg"} alt="" effect="blur" src={src} />
  );
};
