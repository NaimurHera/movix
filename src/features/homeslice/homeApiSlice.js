import { apiSlice } from "../api/apiSlice";

const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMoviesByCategory: builder.query({
      query: (category) => ({
        url: `/movie/${category}`,
        method: "GET",
      }),
    }),
    getApiConfiguration: builder.query({
      query: () => ({
        url: `/configuration`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMoviesByCategoryQuery, useGetApiConfigurationQuery } =
  homeApiSlice;
