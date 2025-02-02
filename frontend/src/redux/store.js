import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminSlice from "./adminRedux/adminSlice.js";
import loadingSlice from "./adminRedux/loaderSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  admin: adminSlice,
  loading: loadingSlice,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["admin"], //Only persist the admin state
};

// 3.Wrap the rootReducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
