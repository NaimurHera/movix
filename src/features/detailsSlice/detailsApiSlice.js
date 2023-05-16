import { apiSlice } from "../api/apiSlice";

export const detailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMediaVideos: builder.query({
      query: ({ media_type, id }) => ({
        url: `/${media_type}/${id}/videos`,
        method: "GET",
      }),
    }),
    getCredits: builder.query({
      query: ({ media_type, id }) => ({
        url: `/${media_type}/${id}/credits`,
        method: "GET",
      }),
    }),
    getDetails: builder.query({
      query: ({ media_type, id }) => ({
        url: `/${media_type}/${id}`,
        method: "GET",
      }),
    }),
    getSimilar: builder.query({
      query: ({ media_type, id }) => ({
        url: `/${media_type}/${id}/similar`,
        method: "GET",
      }),
    }),
    getRecommendations: builder.query({
      query: ({ media_type, id }) => ({
        url: `/${media_type}/${id}/recommendations`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMediaVideosQuery,
  useGetCreditsQuery,
  useGetDetailsQuery,
  useGetRecommendationsQuery,
  useGetSimilarQuery,
} = detailsApiSlice;
