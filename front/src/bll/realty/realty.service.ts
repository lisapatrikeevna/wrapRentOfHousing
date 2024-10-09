
import { baseApi } from "../base-api";
export type RealtyDetailsType={
  id: number
  internet:string
  garage_or_parking:string
  balcony:string
  heating_type:string
  air_conditioning:string
  floor_number:number
  total_floors:number
  pet_friendly:boolean
  furnished:boolean
  description:string
  created_at:string
  updated_at:string
}
export type RealtyType = {
  id: number
  title: string
  description: string
  location: string
  price: string
  number_of_rooms: number
  available: boolean
  rating: number
  register_date: string
  available_date: string
  real_estate_image:string
  category:number
  author:number
  class_realty:string
  details:RealtyDetailsType
  square_footage:number
}

export type RealtyCategoryArgs = {
  name: string
}
export type RealtyRequestType={
  data:Array<RealtyType>
  total_pages:number
  current_page:number
}

const realtyService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createRealty: builder.mutation<void, RealtyCategoryArgs>({
        query: arg => {
          return {
            body: JSON.stringify(arg),
            method: 'POST',
            url: 'realty',
            // url: 'realty/add',
            headers: { 'Content-Type': 'application/json' }
          };
        }, invalidatesTags: ['Realty'],
      }),
      // updateRealty: builder.mutation<void, {body: CategoryType}>({
      //   query: body => {
      //     return {
      //       body:JSON.stringify(body), method: 'PUT', url: `/category/update/${body.id}`, headers: { 'Content-Type': 'application/json'}
      //     }
      //   }, invalidatesTags: ['Category']
      // }),
      removeRealty: builder.mutation<void, {id: number}>({
        query(id) {
          return {method: 'DELETE', url: `realty/${id}/`,}
        }, invalidatesTags: ['Realty']
      }),
      getRealty: builder.query<RealtyRequestType, {params:string}>({
        query: (arg) => {
          console.log('arg!!!!!!' , arg.params);
          const requestConfig = { method: 'GET', url: `realty${arg.params}` };
          // const requestConfig = { method: 'GET', url: 'realty/' };

          // Логируем конфигурацию запроса
          console.log("Запрос к API:", requestConfig);
          return requestConfig;
          // return {method: 'GET', url: 'realty/',}
        }, providesTags: ['Realty'],
      }),
      getItemRealty: builder.query<RealtyType, {id:number}>({
        query: (args) => {
          console.log('args.id', args.id);
          const requestConfig = { method: 'GET', url: `realty/${args.id}` };

          // Логируем конфигурацию запроса
          console.log("Запрос к API:", requestConfig);
          return requestConfig;
          // return {method: 'GET', url: 'realty/',}
        }, providesTags: ['Realty'],
      }),
    }
  },
})

export const {useGetRealtyQuery,useGetItemRealtyQuery} = realtyService
// export const {useCreateCategoryMutation, useGetCategoryQuery, useRemoveCategoryMutation, useUpdateCategoryMutation} = categoryService









