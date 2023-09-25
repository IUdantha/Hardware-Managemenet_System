import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import deliveryService from './deliveryService'

const initialState = {
    deliveries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}

//Create new  Delivery
export const createDelivery = createAsyncThunk('deliveries/create', 
async (deliveryData, thunkAPI) => {

    try{
        //we have to take the token because route is protected
        const token = thunkAPI.getState().auth.user.token
 
        return await deliveryService.createDelivery(deliveryData, token)

    }catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()

            //will reject and send the message
            return thunkAPI.rejectWithValue(message)

    }
})

//Get  deliveries
export const getDeliveries = createAsyncThunk('deliveries/getAll', 
async (_, thunkAPI) => {
        try{
            //we have to take the token because route is protected
            const token = thunkAPI.getState().auth.user.token
    
            return await deliveryService.getDeliveries(token)
    
        }catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()
    
                //will reject and send the message
                return thunkAPI.rejectWithValue(message)
    
        } 
    })

    //Update delivery
export const updateDelivery = createAsyncThunk('deliveries/update', 
async (id, thunkAPI) => {
        try{
            //we have to take the token because route is protected
            const token = thunkAPI.getState().auth.user.token
    
            return await deliveryService.updateDelivery(token)
    
        }catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()
    
                //will reject and send the message
                return thunkAPI.rejectWithValue(message)
    
        } 
    })


//Delete Delivery
export const deleteDelivery = createAsyncThunk('deliveries/delete', 
async (id, thunkAPI) => {

    try{
        //we have to take the token because route is protected
        const token = thunkAPI.getState().auth.user.token

        return await deliveryService.deleteDelivery(id, token)

    }catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()

            //will reject and send the message
            return thunkAPI.rejectWithValue(message)

    }
})

export const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers:{
        //when reset go to initial state
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDelivery.pending,(state) => {
                state.isLoading = true
            })
            .addCase(createDelivery.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.deliveries.push(action.payload)
            })
            .addCase(createDelivery.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getDeliveries.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getDeliveries.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.deliveries = action.payload
            })
            .addCase(getDeliveries.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateDelivery.pending,(state) => {
                state.isLoading = true
            })
            .addCase(updateDelivery.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.deliveries = state.deliveries.filter((delivery) => delivery._id !== action.payload.id) 
            })
            .addCase(updateDelivery.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteDelivery.pending,(state) => {
                state.isLoading = true
            })
            .addCase(deleteDelivery.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.deliveries = state.deliveries.filter((delivery) => delivery._id !== action.payload.id) //payload.id - the id of the goal we delete(server)
            })
            .addCase(deleteDelivery.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }

})

export const {reset} = deliverySlice.actions
export default deliverySlice.reducer