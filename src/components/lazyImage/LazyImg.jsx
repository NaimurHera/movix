import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import loadingImg from "../../assets/loading-preview.png";
import "./style.scss";
export const LazyImg = ({ src, className }) => {
  return (
    <LazyLoadImage
      className={className}
      alt=""
      effect="blur"
      src={src}
      placeholderSrc={loadingImg}
    />
  );
};
