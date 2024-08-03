import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moviesApi } from "../services/moviesApi";
import { imageUploadApi } from "../services/imageUploadApi";
import { authApi } from "../services/authApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
  [imageUploadApi.reducerPath]: imageUploadApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      moviesApi.middleware,
      imageUploadApi.middleware
    ),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
