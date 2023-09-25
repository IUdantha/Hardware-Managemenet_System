import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import adminService from './adminService'


const initialState = {

    admins: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}

export const register = createAsyncThunk('admins/register', async(user, thunkAPI) => {
    try{
        //return the payload that coming back from the register function in the service
        return await adminService.register(user)     //pass the user into the function
    }catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()

            //will reject and send the message
            return thunkAPI.rejectWithValue(message)
    }
}
)

//Create new Admin
export const registerAdmin = createAsyncThunk('admins/registerAdmin', 
async (adminData, thunkAPI) => {

    try{
        //we have to take the token because route is protected
        const token = thunkAPI.getState().auth.user.token

        return await adminService.registerAdmin(adminData, token)

    }catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()

            //will reject and send the message
            return thunkAPI.rejectWithValue(message)

    }
})

//Get Admins
export const getAdmins = createAsyncThunk('admins/getAll', 
async (_, thunkAPI) => {
        try{
            //we have to take the token because route is protected
            const token = thunkAPI.getState().auth.user.token
    
            return await adminService.getAdmins(token)
    
        }catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()
    
                //will reject and send the message
                return thunkAPI.rejectWithValue(message)
    
        } 
    })

    //Update Admin
export const updateAdmin = createAsyncThunk('admins/update', 
async (id, thunkAPI) => {
        try{
            //we have to take the token because route is protected
            const token = thunkAPI.getState().auth.user.token
    
            return await adminService.updateAdmin(token)
    
        }catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()
    
                //will reject and send the message
                return thunkAPI.rejectWithValue(message)
    
        } 
    })


//Delete Admin
export const deleteAdmin = createAsyncThunk('admins/delete', 
async (id, thunkAPI) => {

    try{
        //we have to take the token because route is protected
        const token = thunkAPI.getState().auth.user.token

        return await adminService.deleteAdmin(id, token)

    }catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()

            //will reject and send the message
            return thunkAPI.rejectWithValue(message)

    }
})

    //Get Profile
    export const getProfile = createAsyncThunk('admins/getProfile', 
    async (id, thunkAPI) => {
            try{
                //we have to take the token because route is protected
                const token = thunkAPI.getState().auth.user.token
        
                return await adminService.getProfile(token)
        
            }catch(error){
                const message = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.toString()
        
                    //will reject and send the message
                    return thunkAPI.rejectWithValue(message)
        
            } 
        })

        
export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        //when reset go to initial state
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder

        .addCase(register.pending, (state) => {
            state.isLoading = true
        })

        //we get the data
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true

        })
        
        //If something goes wwrong
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload //return thunkAPI.rejectWithValue(message) this returns
            state.user = null

        })

            .addCase(registerAdmin.pending,(state) => {
                state.isLoading = true
            })
            .addCase(registerAdmin.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.managers.push(action.payload)
            })
            .addCase(registerAdmin.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getAdmins.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getAdmins.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.managers = action.payload
            })
            .addCase(getAdmins.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateAdmin.pending,(state) => {
                state.isLoading = true
            })
            .addCase(updateAdmin.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admins = state.admins.filter((admin) => admin._id !== action.payload.id) 
            })
            .addCase(updateAdmin.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteAdmin.pending,(state) => {
                state.isLoading = true
            })
            .addCase(deleteAdmin.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admins = state.managers.filter((admin) => admin._id !== action.payload.id) 
            })
            .addCase(deleteAdmin.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
            .addCase(getProfile.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getProfile.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admins = state.admins.filter((admin) => admin._id !== action.payload.id) 
            })
            .addCase(getProfile.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            
    }

})

export const {reset} = adminSlice.actions
export default adminSlice.reducer
