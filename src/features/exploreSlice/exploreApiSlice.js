import { apiSlice } from "../api/apiSlice";

export const exploreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiscoverMedia: builder.query({
      query: (media_Type) => ({
        url: `/discover/${media_Type}`,
        method: "GET",
      }),
    }),

    getFilteredDiscoverMedia: builder.query({
      query: ({ media_Type, sort_by, with_genres }) => ({
        url: `/discover/${media_Type}?${with_genres && `with_genres=${with_genres}`}&${
          sort_by && `sort_by=${sort_by}`
        }`,
        method: "GET",
      }),
    }),

    getMoreDiscoverMedia: builder.query({
      query: ({ media_Type, sort_by, with_genres, pageNumber }) => ({
        url: `/discover/${media_Type}?${with_genres && `with_genres=${with_genres}`}&
        ${sort_by && `sort_by=${sort_by}`}&page=${pageNumber}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDiscoverMediaQuery, useGetMoreDiscoverMediaQuery, useGetFilteredDiscoverMediaQuery } =
  exploreApiSlice;
