import { baseApi } from "../base-api";

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
}

export type RealtyCategoryArgs = {
  name: string
}


const realtyService = baseApi.injectEndpoints({
  endpoints: builder => {
    debugger
    return {
      createRealty: builder.mutation<void, RealtyCategoryArgs>({
        query: arg => {
          return {
            body: JSON.stringify(arg),
            method: 'POST',
            url: 'realty/add',
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
          return {method: 'DELETE', url: `realty/delete/${id}`,}
        }, invalidatesTags: ['Realty']
      }),
      getRealty: builder.query<any, void>({
        query: () => {
          console.log()
          return {method: 'GET', url: 'realty/',}
        }, providesTags: ['Realty'],
      }),
    }
  },
})

export const {useGetRealtyQuery} = realtyService
// export const {useCreateCategoryMutation, useGetCategoryQuery, useRemoveCategoryMutation, useUpdateCategoryMutation} = categoryService
