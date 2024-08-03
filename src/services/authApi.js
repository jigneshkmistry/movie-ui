import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryAuth from './authBaseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryAuth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ payload }) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
