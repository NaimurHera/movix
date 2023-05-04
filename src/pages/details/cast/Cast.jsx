import { useSelector } from "react-redux";

import "./style.scss";

import avatar from "../../../assets/avatar.png";
import Container from "../../../components/container/Container";
import { LazyImg } from "../../../components/lazyImage/LazyImg";
const Cast = ({ data, loading, isError, error }) => {
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
          <>
            {/*  if data greater than 0 and there is no error then show content */}
            {!isError && data.length > 0 && (
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
            )}
            {/* if data is equals to 0 and there is no error then show the content below  */}
            {!isError && data.length === 0 && (
              <div className="noCastText">No Casts found!</div>
            )}
            {/* show error if there is an error */}
            {isError && <div className="errorText">{error}</div>}
          </>
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
