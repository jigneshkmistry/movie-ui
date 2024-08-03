import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryImageUpload from "./uploadImageBaseQuery";
export const imageUploadApi = createApi({
  reducerPath: "imageUploadApi",
  baseQuery: baseQueryImageUpload,
  endpoints: (builder) => ({
    postImageUrl: builder.mutation({
      query: (formData) => ({
        url: `movie/upload`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { usePostImageUrlMutation } = imageUploadApi;
