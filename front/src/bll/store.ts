import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from "./base-api";
import { appReducer } from "./app.slice";
// import { deckReducer } from "@/services/decks/decks.slice.ts";

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer ,
    // [decksSlice.name]: decksSlice.reducer,

    app: appReducer,
    // packs: packsReducer,
    // decks: deckReducer,
    // [cardsApi.reducerPath]: cardsApi.reducer
  },
})
setupListeners(store.dispatch)
export type AppDispatchType = typeof store.dispatch
export type RootStateType = ReturnType<typeof store.getState>




