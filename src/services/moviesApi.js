import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryMovies from "./baseQuery";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: baseQueryMovies,
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (params) => ({
        url: "movie",
        params: {
          fields: params.fields,
          pageno: params.pageNo,
          pagesize: params.pageSize,
          order: params.sortOrder,
        },
      }),
    }),
    postMovies: builder.mutation({
      query: ({ payload }) => ({
        url: `movie`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetMoviesQuery, usePostMoviesMutation } = moviesApi;
