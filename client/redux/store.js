
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import  userReducer  from './user/userSlice'
import themeReducer from './theme/themeSlice'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"
import { version } from 'mongoose'
import { AiTwotoneProject } from 'react-icons/ai';


const rootReducer = combineReducers({user:userReducer,
  theme: themeReducer
})

const persistConfig = {
    key:'root',
    storage,
    version:1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}) //a middleware for error handling of redux
})

export const persistor = persistStore(store)