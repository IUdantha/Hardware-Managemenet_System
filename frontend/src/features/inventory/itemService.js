import axios from 'axios'

const API_URL = '/api/items/'

//create new item
const createItem = async(itemData, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL , itemData, config)
    return response.data
}

//get Items
const getItems = async(token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL ,config)
    return response.data
}

//Update Item
const updateItem = async(itemId, itemData, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.update(API_URL + itemId, itemData, config)
    return response.data
}

//Delete Item
const deleteItem = async(itemId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + itemId, config)
    return response.data
}

//Get specific Item
const getSpecificItems = async(itemId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + itemId, config)
    return response.data
}


const itemService = {
    createItem,
    getItems,
    updateItem,
    deleteItem,
    getSpecificItems,
}

export default itemService