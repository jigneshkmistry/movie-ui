import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryMovies from "./baseQuery";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: baseQueryMovies,
  tagTypes: ["Movie"],
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
      providesTags: ["Movie"],
    }),
    getMovieById: builder.query({
      query: ({ id }) => ({
        url: `movie/${id}`,
      }),
    }),
    postMovies: builder.mutation({
      query: ({ payload }) => ({
        url: `movie`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Movie"],
    }),
    putMovies: builder.mutation({
      query: ({ id, payload }) => ({
        url: `movie/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  usePostMoviesMutation,
  usePutMoviesMutation,
  useGetMovieByIdQuery,
} = moviesApi;
