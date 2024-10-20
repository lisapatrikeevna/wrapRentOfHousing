import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "./category/category.service";
import { UserType } from "./auth/auth.type";

type initialStateType = {
  access_token:string|null
  refresh_token:string|null
  user:UserType|null
  categories: Array<CategoryType>
  filteringOptions: string
  isLoadingCategory: boolean
  isErrorCategory: string | boolean
}
const initialState: initialStateType = {
  user: null,
  access_token:null,
  refresh_token:null,
  categories: [], filteringOptions: '?page=1', isLoadingCategory: false, isErrorCategory: false, // user:{}as User,
}

const slice = createSlice({
  name: 'App', initialState, reducers: {
    setCategories: (state, action: PayloadAction<Array<CategoryType>>) => {
      state.categories = action.payload
    }, setIsLoadingCategory: (state, action: PayloadAction<boolean>) => {
      state.isLoadingCategory = action.payload
    }, setIsErrorCategory: (state, action: PayloadAction<string>) => {
      state.isErrorCategory = action.payload
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      debugger
      state.user = action.payload
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh_token = action.payload
    },
    setLogout(state) {
      // Очистка стейта пользователя при выходе
      state.access_token = null;
      state.refresh_token = null;
      state.user = null
      // Очистка токенов из localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
})
export const appAC = slice.actions
export const appReducer = slice.reducer

// TC

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
