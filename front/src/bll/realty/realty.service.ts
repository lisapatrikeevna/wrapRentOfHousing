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
          const res = {
            url: 'realty/', method: 'POST', body: arg,
            // headers: {
            //   'Authorization': `Bearer ${token}`,
            //   // 'Content-Type': 'application/json',
            // },

          };
          return res
        }, invalidatesTags: ['Realty'],
      }),
      updateRealty: builder.mutation<void, {id: number,body:RealtyType}>({
        query: (args) => {
          return {
            url: `realty/${args.id}`, method: 'PUT',  body: args.body,
            // headers: {'Content-Type': 'application/json'}
          }
        }, invalidatesTags: ['Realty']
      }),
      patchRealty: builder.mutation<void, {id: number; body: any}>({
        query: ({id, body}) => {
          return {url: `realty/${id}`, method: 'PATCH', body: body,};
        },
        // invalidatesTags: ['Realty'],
        invalidatesTags: ['Me', 'Realty'],
      }),
      removeRealty: builder.mutation<void, {id: number}>({
        query(id) {
          return {method: 'DELETE', url: `realty/${id}`}
        }, invalidatesTags: ['Realty']
      }),
      getRealty: builder.query<RealtyRequestType, {params: string}>({
        query: (arg) => {
          console.log('arg!!!!!!', arg.params);
          return  {method: 'GET', url: `realty/${arg.params}`};
        }, providesTags: ['Realty'],
      }),
      getUsersRealty: builder.query<RealtyRequestType, {params: string}>({
        query: (arg) => {
          console.log('arg!!!!!!', arg.params);
          return  {method: 'GET', url: `realty/additional/${arg.params}/`};
        }, providesTags: ['Realty'],
      }),
      getItemRealty: builder.query<RealtyType, {id: number}>({
        query: (args) => {
          console.log('args.id', args.id);
          return  {method: 'GET', url: `realty/${args.id}`, headers: {}};
        }, providesTags: ['Realty'],
      }),
      getFilterList: builder.query<FilterType, void>({
        query: () => {
          return  {method: 'GET', url: `realty/filterList/`, headers: {}};
        }, providesTags: ['Realty'],
      }),
    }
  },
})

export const {useGetRealtyQuery, useGetItemRealtyQuery, useLazyGetFilterListQuery, useCreateRealtyMutation, useUpdateRealtyMutation, useRemoveRealtyMutation, usePatchRealtyMutation, useGetUsersRealtyQuery} = realtyService
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



