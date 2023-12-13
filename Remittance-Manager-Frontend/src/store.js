import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import keyReducer from './keySlice';
import changeReducer from './changeSlice';

export default configureStore({
    reducer: {
        account: accountReducer,
        key: keyReducer,
        change: changeReducer
    }
})