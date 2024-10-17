import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoritesReducer from "./favoritesSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { createTransform } from "redux-persist";

const transform = createTransform(
  (inboundState, key) => {
    return inboundState;
  },
  (outboundState, key) => {
    return outboundState;
  },
  { whitelist: ["favorites"] },
);

const persistConfig = {
  key: "root",
  storage,
  transforms: [transform],
  blacklist: ["register"],
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
