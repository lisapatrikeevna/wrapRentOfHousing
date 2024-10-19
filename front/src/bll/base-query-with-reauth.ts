import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { API_URL } from "../config";
import { appAC } from "./app.slice";
import { RefreshResponse } from "./auth/auth.type"; // Импорт экшенов для управления стейтом

const mutex = new Mutex()

const token = localStorage.getItem('access_token');

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL, headers: {
    'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : '',
  }
})

export const baseQueryWithReauth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> =
  async(args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if( result.error && result.error.status === 401 ) {
    if( !mutex.isLocked() ) {
      const release = await mutex.acquire()
      // Попытка получить новый токен
      const refreshResult = await baseQuery({method: 'POST', url: '/auth/refreshToken/'}, api, extraOptions) as {data?: RefreshResponse}

      if( refreshResult.data?.access_token ) {
        // Сохраняем новый access token
        localStorage.setItem('access_token', refreshResult.data.access_token);
        api.dispatch(appAC.setAccessToken(refreshResult.data.access_token));

        // Проверяем, что args — это объект, перед тем как использовать оператор расширения
        if( typeof args === 'object' ) {
          result = await baseQuery({
            ...args,  // Расширяем только объект
            headers: {
              ...args.headers,  // Проверяем и расширяем существующие заголовки
              'Authorization': `Bearer ${refreshResult.data.access_token}`,
            },
          }, api, extraOptions);
        }
      }
      release()
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
