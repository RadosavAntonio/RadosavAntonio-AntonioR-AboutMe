// ----- External imports -----
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import Reactotron from '../../ReactotronConfig'

// ----- Reducer imports -----
import sessionReducer from './slices/sessionSlice'
import userReducer from './slices/userSlice'

// ----- Persist configs -----
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  stateReconciler: autoMergeLevel2,
  whitelist: ['user'],
  blacklist: ['session'],
}

// ----- Combine all reducers -----
const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// ----- Create persisted reducer -----
const persistedReducer = persistReducer<RootState>(
  rootPersistConfig,
  rootReducer,
)

// ----- Configure store with middleware and enhancers -----
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  enhancers: getDefaultEnhancers => {
    return __DEV__
      ? getDefaultEnhancers().concat([Reactotron.createEnhancer!()])
      : getDefaultEnhancers()
  },
})

export const persistor = persistStore(store)

// ----- Type exports for use in app -----
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
