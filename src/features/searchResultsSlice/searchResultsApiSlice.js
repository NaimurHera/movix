import { apiSlice } from "../api/apiSlice";

export const searchResultsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchResults: builder.query({
      query: (query) => ({
        url: `/search/multi?query=${query}&page=1`,
        method: "GET",
      }),
    }),
    getMoreSearchResults: builder.query({
      query: ({ query, pageNumber }) => ({
        url: `/search/multi?query=${query}&page=${pageNumber}`,
        method: "GET",
      }),
      async onQueryStarted({ query }, { queryFulfilled, dispatch }) {
        try {
          // updating the cach data pessimastically start
          const { data: searchResults } = await queryFulfilled;
          if (searchResults) {
            dispatch(
              apiSlice.util.updateQueryData("getSearchResults", query, (draft) => {
                // push the new movies to the old movies array
                return {
                  ...draft,
                  results: [...draft.results, ...searchResults.results],
                };
              })
            );
          }
          // updating the cach data pessimastically end
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetSearchResultsQuery, useGetMoreSearchResultsQuery } = searchResultsApiSlice;
