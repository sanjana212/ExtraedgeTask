
import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../Reducers/UserReducer';
const store=configureStore({
  reducer:{
    users:UserReducer
    }
})
export default store