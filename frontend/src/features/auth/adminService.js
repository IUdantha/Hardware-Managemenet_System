import axios from 'axios'

const API_URL = '/api/admins/'
const API_URLU = '/api/users/'

//Create register function
const register = async (userData) => {
    //get the response from the server
    const response = await axios.post(API_URLU,userData)  //send the user data

    return response.data
}

//Create registerAdmin function
const registerAdmin = async (adminData, token) => {

    const config = {
        headers: {
            Authorization:`Bearer ${token}`,
        }
    }

    //get the response from the server
    const response = await axios.post(API_URL, adminData, config)  //send the user data

    return response.data
}


//get Admins
const getAdmins = async(token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL ,config)

    return response.data
}

//Update Admin
const updateAdmin = async(adminId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.update(API_URL + adminId, config)

    return response.data
}


//Delete Admin
const deleteAdmin = async(adminId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + adminId, config)

    return response.data
}

//Get Profile
const getProfile = async(adminId, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + adminId, config)

    return response.data
}


const adminService = {
    register,
    registerAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    getProfile
}

export default adminService