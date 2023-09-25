import axios from 'axios'

const API_URL = '/api/deliveries/'

//create new delivery
const createDelivery = async(deliveryData, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL , deliveryData, config)

    return response.data
}

//get Deliveries
const getDeliveries = async(token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL ,config)

    return response.data
}

//Update Delivery
const updateDelivery = async(deliveryId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.update(API_URL + deliveryId, config)

    return response.data
}


//Delete Delivery
const deleteDelivery = async(deliveryId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + deliveryId, config)

    return response.data
}

const deliveryService = {
    createDelivery,
    getDeliveries,
    updateDelivery,
    deleteDelivery,
}

export default deliveryService