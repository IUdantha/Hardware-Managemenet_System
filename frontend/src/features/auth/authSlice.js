import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

//bring authService
import authService from './authService'

//Get user from local storage
//local storage can only have strings

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register User
//auth/register - action

//thunkAPI - an object containing all of the parameters that are normally passed to a Redux thunk function
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
        try{
            //return the payload that coming back from the register function in the service
            return await authService.register(user)     //pass the user into the function
        }catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()

                //will reject and send the message
                return thunkAPI.rejectWithValue(message)
        }
    }
)


//Login
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try{

        return await authService.login(user)     
    }catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()

            //will reject and send the message
            return thunkAPI.rejectWithValue(message)
    }
}
)

//Logout
export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
}
)


//A function that accepts an initial state, an object of reducer functions, and a "slice name", 
//and automatically generates action creators and action types that correspond to the reducers and state.
export const authSlice = createSlice({
    name: 'auth',  //uda funtion eke action ekata '/' ekta kln dunna name eka
    initialState,   // The initial state for the reducer
    reducers: {     // An object of "case reducers". Key names will be used to generate actions.
        //after registered and all set, reset the values
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
           
        },
    },
    // A "builder callback" function used to add more reducers, or
    // an additional object of "case reducers", where the keys should be other
    // action types
    extraReducers: (builder) => {
        builder
            //wt happens when register is pending
            //Register Customer
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })

            //we get the data
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload //this is the data that is returned (try block)

            })
            
            //If something goes wwrong
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload //return thunkAPI.rejectWithValue(message) this returns
                state.user = null

            })

            //login
            
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //response from the backend
                state.user = action.payload //this is the data that is returned (try block)

            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                //error message
                state.message = action.payload //return thunkAPI.rejectWithValue(message) this returns
                state.user = null

            })

            //logout
            .addCase(logout.fulfilled, (state) =>{
                state.user = null
            } )
            
           
    },
}
)

//we can bring the reset function to the components we want to run it
export const { reset } = authSlice.actions

export default authSlice.reducer