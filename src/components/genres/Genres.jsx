import { useGetGenresQuery } from "../../features/homeslice/homeApiSlice";
import "./style.scss";
export default function Genres({ genreIds }) {
  const { data: moviesGenres } = useGetGenresQuery("movie");
  const { data: tvGenres } = useGetGenresQuery("tv");

  const allGenres = () => {
    // getting the unique genres since there are some same genres in both genres
    if (tvGenres && moviesGenres) {
      const genres = [...moviesGenres.genres, ...tvGenres.genres].reduce(
        (acc, obj) => {
          if (!acc.find((item) => item.id === obj.id)) {
            acc.push(obj);
          }
          return acc;
        },
        []
      );
      return genres;
    } else {
      return;
    }
  };

  return (
    <div className="genres">
      {genreIds?.map((id) => {
        const genre = allGenres()?.find((g) => g.id === id);
        return (
          <div key={id} className="genre">
            {genre?.name}
          </div>
        );
      })}
    </div>
  );
}
