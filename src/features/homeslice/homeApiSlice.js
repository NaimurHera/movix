import { apiSlice } from "../api/apiSlice";

const homeApiSlice = apiSlice.injectEndpoints({
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
    getlatest: builder.query({
      query: ({ media_type, endpoint }) => ({
        url: `/${media_type}/${endpoint}`,
        method: "GET",
      }),
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
  useGetlatestQuery,
} = homeApiSlice;
