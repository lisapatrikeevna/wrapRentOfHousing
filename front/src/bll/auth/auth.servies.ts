import { baseApi } from "../base-api";
import { LoginArgs, responseRegisterType, SignUpArgs } from "./auth.type";


const token = localStorage.getItem('access_token');
const headers= {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
}


const authService=baseApi.injectEndpoints({
 endpoints: builder => ({

   me: builder.query<any, void>({
     query: () => {
       return {url: `/auth/me/`, method: 'GET',headers
       }
     },
     extraOptions: {maxRetries: 0,},
     providesTags: ['Me'],
   }),

   // login: builder.mutation<responseRegisterType, LoginArgs>({
   //   query: args => {
   //     console.log("args", args);
   //     return {url: `/auth/login/`, method: 'POST', body: JSON.stringify(args), headers: {'Content-Type': 'application/json',},}
   //   },
   //   invalidatesTags: ['Me'],
   // }),
   login: builder.mutation<responseRegisterType, LoginArgs>({
     query: args => {
       console.log("args", args);
       const res= {
         url: `/auth/login/`,
         method: 'POST',
         headers: {'Content-Type': 'application/json',},
         // body: JSON.stringify(
         //   {
         //   username: "air",
         //   password: "12345"}),
         body: JSON.stringify(args),
       };
       console.log(res);
       return res;
     },
     invalidatesTags: ['Me'],
     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
       try {
         const { data } = await queryFulfilled;
         console.log('Login successful:', data);
       } catch (error) {
         console.error('Login error:', error);
       }
     },
   }),


   // signUp: builder.mutation<void, SignUpArgs>({
   signUp: builder.mutation<responseRegisterType, SignUpArgs>({
     query: args => {
       console.log('args for register', args);
       return { url: `/auth/register/`, method: 'POST',body: args}
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
