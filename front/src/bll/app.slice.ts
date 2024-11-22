import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "./category/category.service";
import { UserType } from "./auth/auth.type";
import { SearchParamsType } from "../components/searchSettings/SearchSettings";


type initialStateType = {
  additionalFilters: SearchParamsType | null
  user: UserType | null
  categories: Array<CategoryType>
  filteringOptions: string
  isLoadingCategory: boolean
  isErrorCategory: string | boolean
}
const initialState: initialStateType = {
  user: null, additionalFilters: null,
  categories: [], filteringOptions: '?page=1', isLoadingCategory: false, isErrorCategory: false, // user:{}as UserType,
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
    setUser: (state, action: PayloadAction<{user: UserType}>) => {
      state.user = action.payload.user
    }, // setSearch: (state, action: PayloadAction<string>) => {
    // state.searchValue = action.payload },
    setLogout(state) {
      // Очистка стейта пользователя при выходе
      state.user = null
      state.additionalFilters = null
      state.filteringOptions = ''
      // Очистка токенов из localStorage
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token');
    },
    setAdditionalFilters: (state, action: PayloadAction<SearchParamsType | null>) => {
        state.additionalFilters = action.payload
    },
    setClearAdditionalFilters: (state) => {
         state.additionalFilters = null
    }
  }
})
export const appAC = slice.actions
export const appReducer = slice.reducer


