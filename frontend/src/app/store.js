//a store is a container that holds and manages your application’s global state.
//an action is a plain JavaScript object that represents an intention to change the store’s state.
//A reducer is a plain JavaScript function that accepts the store’s current state and an action and returns the new state.
//Accessing the state should never be done directly and is achieved through functions provided by the store.
//Reducers are the only way the store’s current state can be changed within a Redux application.

import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

import adminReducer from '../features/auth/adminSlice'
// import managerReducer from '../features/auth/managerSlice'

// import driverReducer from '../features/delivery/driverSlice'


//admin manage epmloyee
//import employeeReducer from '../features/employee/empSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // drivers: driverReducer,
    // managers: managerReducer,
    admins: adminReducer

  },
});


