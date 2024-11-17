import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "./category/category.service";
import { UserType } from "./auth/auth.type";
import { SearchParamsType } from "../components/searchSettings/SearchSettings";


type initialStateType = {
  additionalFilters: SearchParamsType | null
  // refresh_token: string | null
  user: UserType | null
  categories: Array<CategoryType>
  filteringOptions: string
  isLoadingCategory: boolean
  isErrorCategory: string | boolean
}
const initialState: initialStateType = {
  user: null, additionalFilters: null,
  // refresh_token: null,
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
    }, setUser: (state, action: PayloadAction<{user:UserType}>) => {
      state.user = action.payload.user
    },
      // setRefreshToken: (state, action: PayloadAction<string>) => {
      // state.refresh_token = action.payload },
  setLogout(state) {
      // Очистка стейта пользователя при выходе
      state.user = null
      state.additionalFilters=null
      state.filteringOptions=''
      // Очистка токенов из localStorage
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token');
    }, setAdditionalFilters: (state, action: PayloadAction<SearchParamsType|null>) => {
      console.log('appSlise/setAdditionalFilters/payload: ', action.payload);
      state.additionalFilters = action.payload
    },
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
