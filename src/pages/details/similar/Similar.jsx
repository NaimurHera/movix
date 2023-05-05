import Carousel from "../../../components/carousel/Carousel";
import Container from "../../../components/container/Container";
import { useGetSimilarQuery } from "../../../features/detailsSlice/detailsApiSlice";

const Similar = ({ mediaType, id }) => {
  const { data, isLoading, error, isError } = useGetSimilarQuery({
    media_type: mediaType,
    id,
  });

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <section className="similarSection">
      <Container>
        <h2 className="carouselTitle">{title}</h2>
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

export default Similar;
