import { baseApi } from "../base-api";
import { CreateRealtyType, FilterType, RealtyRequestType, RealtyType } from "./realty.type";

// const token = localStorage.getItem('access_token');
// const headers= {
//   'Authorization': `Bearer ${token}`,
//   'Content-Type': 'application/json',
// }

const realtyService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createRealty: builder.mutation<void, CreateRealtyType>({
        query: (arg) => {
          const res= {
            url: 'realty/',
            method: 'POST',
            // headers: {
            //   'Authorization': `Bearer ${token}`,
            //   // 'Content-Type': 'application/json',
            // },
            body: arg,
          };
          return res
        }, invalidatesTags: ['Realty'],
      }),
      updateRealty: builder.mutation<void, {body: any}>({
        query: body => {
          return {
            body:JSON.stringify(body), method: 'PUT', url: `realty/${body.id}`, headers: { 'Content-Type': 'application/json'}
          }
        }, invalidatesTags: ['Realty']
      }),
      patchRealty: builder.mutation<void, { id: number; body: any }>({
        query: ({ id, body }) => {
          return {
            url: `realty/${id}`, // Убедитесь, что здесь есть завершающий слэш
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
          };
        },
        invalidatesTags: ['Realty'],
      }),
      removeRealty: builder.mutation<void, {id: number}>({
        query(id) {
          return {method: 'DELETE', url: `realty/${id}`}
        }, invalidatesTags: ['Realty']
      }),
      getRealty: builder.query<RealtyRequestType, {params:string}>({
        query: (arg) => {
          console.log('arg!!!!!!' , arg.params);
          const requestConfig = { method: 'GET', url: `realty/${arg.params}` };

          // Логируем конфигурацию запроса
          console.log("Запрос к API:", requestConfig);
          return requestConfig;
        }, providesTags: ['Realty'],
      }),
      getItemRealty: builder.query<RealtyType, {id:number}>({
        query: (args) => {
          console.log('args.id', args.id);
          const requestConfig = { method: 'GET', url: `realty/${args.id}`,headers:{} };

          // Логируем конфигурацию запроса
          console.log("Запрос к API:", requestConfig);
          return requestConfig;
          // return {method: 'GET', url: 'realty/',}
        }, providesTags: ['Realty'],
      }),
      getFilterList: builder.query<FilterType, void>({
        query: () => {
          const requestConfig = { method: 'GET', url: `realty/filterList/`,headers:{} };

          console.log("Запрос к API:", requestConfig);
          return requestConfig;
        }, providesTags: ['Realty'],
      }),
    }
  },
})

export const {useGetRealtyQuery,useGetItemRealtyQuery,useLazyGetFilterListQuery, useCreateRealtyMutation, useUpdateRealtyMutation,useRemoveRealtyMutation , usePatchRealtyMutation} = realtyService
// export const {useCreateCategoryMutation, useGetCategoryQuery, useRemoveCategoryMutation, useUpdateCategoryMutation} = categoryService






// export const realtyApi = createApi({
//   reducerPath: 'realtyApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://127.0.0.1:8000/api/',
//     prepareHeaders: (headers, { getState }) => {
//       // Получаем токен из Redux state или localStorage
//       const token = localStorage.getItem('token'); // Или getState().auth.token;
//
//       // Если токен существует, добавляем его в заголовки
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     // Эндпоинт для создания объекта Realty
//     createRealty: builder.mutation({
//       query: (newRealty) => ({
//         url: 'realty/',
//         method: 'POST',
//         body: newRealty,
//       }),
//     }),
//   }),
// });



