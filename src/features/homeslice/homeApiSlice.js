import { apiSlice } from "../api/apiSlice";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMoviesByCategory: builder.query({
      query: (category) => ({
        url: `/movie/${category}`,
        method: "GET",
      }),
    }),
    getPopular: builder.query({
      query: ({ media_type, endpoint }) => ({
        url: `/${media_type}/${endpoint}`,
        method: "GET",
      }),
    }),

    getMoreUpcomingMovies: builder.query({
      query: ({ category, page }) => ({
        url: `/movie/${category}?page=${page}`,
        method: "GET",
      }),
      async onQueryStarted({ category }, { queryFulfilled, dispatch }) {
        try {
          // updating the cach data pessimastically start
          const { data: upcomingMovies } = await queryFulfilled;
          if (upcomingMovies) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getMoviesByCategory",
                category,
                (draft) => {
                  // push the new movies to the old movies array
                  return {
                    ...draft,
                    results: [...draft.results, ...upcomingMovies.results],
                  };
                }
              )
            );
          }
          // updating the cach data pessimastically end
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getTopRated: builder.query({
      query: ({ media_type, endpoint }) => ({
        url: `/${media_type}/${endpoint}`,
        method: "GET",
      }),
    }),
    getApiConfiguration: builder.query({
      query: () => ({
        url: `/configuration`,
        method: "GET",
      }),
    }),
    getTrendingMovies: builder.query({
      query: (endpoint) => ({
        url: `/trending/all/${endpoint}`,
        method: "GET",
      }),
    }),
    getGenres: builder.query({
      query: (media) => ({
        url: `/genre/${media}/list`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetMoviesByCategoryQuery,
  useGetApiConfigurationQuery,
  useGetGenresQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
} = homeApiSlice;
