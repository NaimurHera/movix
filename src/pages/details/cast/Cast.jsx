import { useSelector } from "react-redux";

import "./style.scss";

import avatar from "../../../assets/avatar.png";
import Container from "../../../components/container/Container";
import { LazyImg } from "../../../components/lazyImage/LazyImg";
const Cast = ({ data, loading }) => {
  const { profile } = useSelector((state) => state.url);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <Container>
        <div className="sectionHeading">Top Casts</div>
        {/* if data loading then show skeleton else show content  */}
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              return (
                <div key={item?.id} className="listItem">
                  <div className="profileImg">
                    <LazyImg
                      src={
                        item?.profile_path
                          ? profile + item?.profile_path
                          : avatar
                      }
                    />
                  </div>
                  <div className="name">{item?.name}</div>
                  <div className="character">{item?.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cast;
