import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from "./base-query-with-reauth";

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes:['Realty','Me','Category'],
  baseQuery: baseQueryWithReauth,
  endpoints:()=>({}),
  // refetchOnFocus: true,
})



