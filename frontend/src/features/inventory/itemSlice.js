import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import itemService from './itemService'

const initialState = {
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create new Items
export const createItem = createAsyncThunk('items/create', 
async (itemData, thunkAPI) => {

    try{
        //we have to take the token because route is protected
        const token = thunkAPI.getState().auth.user.token

        return await itemService.createItem(itemData, token)
    }
    catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()

            //will reject and send the message
            return thunkAPI.rejectWithValue(message)
    }
})


//Get items
export const getItems = createAsyncThunk('items/getAll', 
async (_, thunkAPI) => {
    try{
        //we have to take the token because route is protected
        const token = thunkAPI.getState().auth.user.token
    
        return await itemService.getItems(token)  
    }
    catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
    
            //will reject and send the message
            return thunkAPI.rejectWithValue(message)   
    } 
})


//Update Item
export const updateItem = createAsyncThunk('items/update', 
async (id, itemData, thunkAPI) => {
        try{
            //we have to take the token because route is protected
            const token = thunkAPI.getState().auth.user.token
    
            return await itemService.updateItem(id, itemData, token)           //--------------
        }
        catch(error){
            const message = (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString()
    
                //will reject and send the message
                return thunkAPI.rejectWithValue(message)  
        } 
    })


//Delete Item
export const deleteItem = createAsyncThunk('items/delete', 
async (id, thunkAPI) => {

    try{
        //we have to take the token because route is protected
        const token = thunkAPI.getState().auth.user.token

        return await itemService.deleteItem(id, token)
    }
    catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()

            //will reject and send the message
            return thunkAPI.rejectWithValue(message)
    }
})

//Get specific Item
export const getSpecificItems = createAsyncThunk('items/getOne', 
async (id, thunkAPI) => {
    try{
        //we have to take the token because route is protected
        const token = thunkAPI.getState().auth.user.token
    
        return await itemService.getSpecificItems(id, token)  
    }
    catch(error){
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
    
            //will reject and send the message
            return thunkAPI.rejectWithValue(message)   
    } 
})



export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers:{
        //when reset go to initial state
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createItem.pending,(state) => {
                state.isLoading = true
            })
            .addCase(createItem.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items.push(action.payload)
            })
            .addCase(createItem.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getItems.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getItems.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = action.payload
            })
            .addCase(getItems.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //-------

            .addCase(getSpecificItems.pending,(state) => {
                state.isLoading = true
            })
            .addCase(getSpecificItems.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = action.payload
            })
            .addCase(getSpecificItems.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //-------

            .addCase(updateItem.pending,(state) => {
                state.isLoading = true
            })
            .addCase(updateItem.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                //show the remaining goals in the ui after deleting
                state.items = state.items.filter((item) => item._id !== action.payload.id) //payload.id - the id of the driver we delete(server)
            })
            .addCase(updateItem.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteItem.pending,(state) => {
                state.isLoading = true
            })
            .addCase(deleteItem.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                //show the remaining drivers in the ui after deleting
                state.items = state.items.filter((item) => item._id !== action.payload.id) //payload.id - the id of the goal we delete(server)
            })
            .addCase(deleteItem.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = itemSlice.actions
export default itemSlice.reducer