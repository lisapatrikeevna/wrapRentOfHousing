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
      createCategory: builder.mutation<void, CreatCategoryArgs>({
        query: arg => {
          return {
            body: JSON.stringify(arg),
            method: 'POST',
            url: 'category/add',
            headers: { 'Content-Type': 'application/json' }
          };
        }, invalidatesTags: ['Category'],
      }),
      // updateCategory: builder.mutation<void, {body: CategoryType}>({
      //   query: body => {
      //     return {
      //       body:JSON.stringify(body), method: 'PUT', url: `/category/update/${body.id}`, headers: { 'Content-Type': 'application/json'}
      //     }
      //   }, invalidatesTags: ['Category']
      // }),
      removeCategory: builder.mutation<void, {id: number}>({
        query(id) {
          return {method: 'DELETE', url: `category/delete/${id}`,}
        }, invalidatesTags: ['Category']
      }),
      getCategory: builder.query<Array<CategoryType>, void>({
        query: () => {
          return {method: 'GET', url: 'category/',}
        }, providesTags: ['Category'],
      }),
    }
  },
})

export const {useGetCategoryQuery} = categoryService
// export const {useCreateCategoryMutation, useGetCategoryQuery, useRemoveCategoryMutation, useUpdateCategoryMutation} = categoryService
