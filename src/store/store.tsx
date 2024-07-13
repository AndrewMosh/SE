import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./userSlice";

// Конфигурация store с подключением reducer
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Типизация состояния store
export type RootState = {
    user: UserState;
};

export type AppDispatch = typeof store.dispatch;
