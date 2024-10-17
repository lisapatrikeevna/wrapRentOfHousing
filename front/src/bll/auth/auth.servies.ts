// import { baseApi } from "@/services/base-api";
// import { LoginArgs, SignUpArgs } from "@/services/auth/auth.type"


import { baseApi } from "../base-api";
import { LoginArgs, SignUpArgs } from "./auth.type";

const authService=baseApi.injectEndpoints({
 endpoints: builder => ({

   // me: builder.query<any, void>({
   //   query: () => {
   //     return {url: `/auth/me`, method: 'GET',
   //     }
   //   },
   //   extraOptions: {maxRetries: 0,},
   //   providesTags: ['Me'],
   // }),

   login: builder.mutation<void, LoginArgs>({
     query: args => {
       return {url: `/auth/register`, method: 'POST', params: args,}
     },
     invalidatesTags: ['Me'],
   }),

   signUp: builder.mutation<void, SignUpArgs>({
     query: args => {
       return { url: `/auth/sign-up`, method: 'POST',body: args}
     },

     // async onQueryStarted(_, { dispatch, queryFulfilled }) {
     //   const patchResult = dispatch(
     //     authService.util.updateQueryData('me', undefined, () => {
     //       return null
     //     })
     //   )
     //
     //   try {
     //     await queryFulfilled
     //   } catch {
     //     patchResult.undo()
     //
     //     /**
     //      * Alternatively, on failure you can invalidate the corresponding cache tags
     //      * to trigger a re-fetch:
     //      * dispatch(api.util.invalidateTags(['Post']))
     //      */
     //   }
     // },
     invalidatesTags: ['Me'],
   }),

 }),
})

export const { useLoginMutation,useSignUpMutation,useMeQuery } = authService



// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//
// const initialState = {
//   itemsPerPage: 10,
//   currentPage: 1,
//   searchByName: '',
// }
//
// export const decksSlice = createSlice({
//   initialState,
//   name: 'decksSlice',
//   reducers: {
//     setItemsPerPage: (state, action: PayloadAction<number>) => {
//       state.itemsPerPage = action.payload
//     },
//     setCurrentPage: (state, action: PayloadAction<number>) => {
//       state.currentPage = action.payload
//     },
//     setSearchByName: (state, action: PayloadAction<string>) => {
//       state.searchByName = action.payload
//     },
//   },
// })
