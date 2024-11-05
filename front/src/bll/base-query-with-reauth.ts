import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { API_URL } from "../config";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
});

// export const baseQueryWithReauth: BaseQueryFn<
//   FetchArgs | string,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   await mutex.waitForUnlock();
//   let result = await baseQuery(args, api, extraOptions);
//
//   if (result.error && result.error.status === 401||result.error?.status === 403) {
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();
//       try {
//         // try to get a new token
//         const refreshResult = await baseQuery(
//           { method: "POST", url: "/auth/refreshToken/" },
//           api,
//           extraOptions,
//         );
//
//         if (refreshResult.meta?.response?.status === 204) {
//           // retry the initial query
//           result = await baseQuery(args, api, extraOptions);
//         }else {
//           // Обработка ошибок обновления токена
//           console.error('Token refresh failed:', refreshResult.error);
//         }
//       } finally {
//         release();
//       }
//
//       // release();
//     } else {
//       // wait until the mutex is available without locking it
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }
//
//   return result;
// };


export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { method: "POST", url: "/auth/refreshToken/" },
          api,
          extraOptions,
        );

        if (refreshResult.meta?.response?.status === 204) {
          console.log('if refreshResult 204/args, api, extraOptions: ',args, api, extraOptions);
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.error('Token refresh failed:', refreshResult.error);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};



