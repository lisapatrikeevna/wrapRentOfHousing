import { baseApi } from "../base-api";

export type CategoryType = {
  id: number
  name: string
}
export type CreatCategoryArgs = {
  name: string
}


const categoryService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCategory: builder.query<Array<CategoryType>, void>({
        query: () => {
          const res= {method: 'GET', url: 'category/',headers:{}}
          console.log("!!!! getCategory : ",res);
          return res;
          // return {method: 'GET', url: 'category/',}
        }, providesTags: ['Category'],
      }),
    }
  },
})

export const {useGetCategoryQuery} = categoryService
// export const {useCreateCategoryMutation, useGetCategoryQuery, useRemoveCategoryMutation, useUpdateCategoryMutation} = categoryService
