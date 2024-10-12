import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType, useGetCategoryQuery } from "./category/category.service";
// import { User } from "@/services/auth/auth.type.ts";
import { baseApi } from "./base-api";
import { AppDispatchType, RootStateType } from "./store.ts";

type initialStateType = {
  categories: Array<CategoryType>
  filteringOptions: string
  isLoadingCategory: boolean
  isErrorCategory: string|boolean
  // user:User
}
const initialState: initialStateType = {
  categories: [],
  filteringOptions:'?page=1',
  isLoadingCategory:false,
  isErrorCategory:false,
  // user:{}as User,
}

const slice = createSlice({
  name: 'App', initialState, reducers: {
    setCategories: (state, action: PayloadAction<Array<CategoryType>>) => {
      state.categories = action.payload
    },
    setIsLoadingCategory: (state, action: PayloadAction<boolean>) => {
      state.isLoadingCategory = action.payload
    },
    setIsErrorCategory: (state, action: PayloadAction<string>) => {
      state.isErrorCategory = action.payload
    },
    // setDecksImg: (state, action: PayloadAction<string>) => {
    //   state.decksImg = action.payload
    // },
    // setUser: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload
    // },
  }
})
export const appAC=slice.actions
export const appReducer=slice.reducer

// TC
// export const getCategoriesTC = createAsyncThunk(
//   'app/getCategories',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data, isLoading, isError } = await useGetCategoryQuery();
//       if (isError) {
//         return rejectWithValue(isError);
//       }
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const getCategoriesTC = createAsyncThunk('app/getCategories', async (_, { dispatch }) => {
//     dispatch(appAC.setIsLoadingCategory(true));
//     try {
//       const { data: categories } = await baseApi.endpoints.getCategory.initiate();
//       dispatch(appAC.setCategories(categories));
//     } catch (error) {
//       dispatch(appAC.setIsErrorCategory(error));
//     } finally {
//       dispatch(appAC.setIsLoadingCategory(false));
//     }
//   }
// );

// export const getCategoriesTC = () => async (dispatch: Dispatch) => {
//   dispatch(appAC.setIsLoadingCategory(true));
//   try {
//     const { data: categories } = await useGetCategoryQuery();
//     dispatch(appAC.setCategories(categories));
//     dispatch(appAC.setIsLoadingCategory(false));
//   } catch (isError) {
//     dispatch(appAC.setIsErrorCategory(isError));
//     dispatch(appAC.setIsLoadingCategory(false));
//   }
// };

// export const getCategoriesTC = () => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
//   dispatch(appAC.setIsLoadingCategory(true));
//   try {
//     const result = await dispatch(api.endpoints.getCategory.initiate());
//
//     if (result.error) {
//       throw result.error; // обрабатываем ошибку
//     }
//
//     const categories = result.data;
//     dispatch(appAC.setCategories(categories));
//   } catch (error) {
//     dispatch(appAC.setIsErrorCategory(true));  // корректно отмечаем ошибку
//   } finally {
//     dispatch(appAC.setIsLoadingCategory(false));
//   }
// };
