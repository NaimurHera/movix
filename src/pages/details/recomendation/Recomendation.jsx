import Carousel from "../../../components/carousel/Carousel";
import Container from "../../../components/container/Container";
import { useGetRecommendationsQuery } from "../../../features/detailsSlice/detailsApiSlice";

const Recommendation = ({ mediaType, id }) => {
  const { data, isLoading, error, isError } = useGetRecommendationsQuery({
    media_type: mediaType,
    id,
  });

  return (
    <section className="recomendationSection">
      <Container>
        <h2 className="carouselTitle">Recommendations</h2>
        <Carousel
          error={error}
          isError={isError}
          data={data?.results}
          isLoading={isLoading}
          endpoint={mediaType}
          media={mediaType}
        />
      </Container>
    </section>
  );
};

export default Recommendation;
