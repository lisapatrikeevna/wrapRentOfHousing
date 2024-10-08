import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { API_URL } from "../config";

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  // credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      alert('/v1/auth/refresh-token')
      // try to get a new token
      const refreshResult = await baseQuery(

        { method: 'POST', url: '/v1/auth/refresh-token' },
        api,
        extraOptions
      )

      if (refreshResult.meta?.response?.status === 204) {
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      }
      release()
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}



