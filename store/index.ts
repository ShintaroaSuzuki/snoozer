import { createStore, combineReducers } from 'redux';
import { todoReducer } from './reducers/todo';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoState, NotificationState } from '../types';
import { notificationReducer } from './reducers/notifications';

export type AppState = {
    todo: TodoState[];
    notifications: NotificationState[];
};

const rootReducer = combineReducers<AppState>({
    todo: todoReducer,
    notifications: notificationReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['todo', 'notifications']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);
export default store;
