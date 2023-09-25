//Make the http requests and send the data back

import axios from 'axios'

const API_URL = '/api/users/'

//Create register function
const register = async (userData) => {
    //get the response from the server
    const response = await axios.post(API_URL,userData)  //send the user data

    //axios put response inside the 'data' object
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data)) //include the token
    }


    return response.data
}

//Create login function
const login = async (userData) => {
    //get the response from the server
    const response = await axios.post(API_URL + 'login', userData)  //send the user data

    //axios put response inside the 'data' object
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data)) //include the token
    }


    return response.data
}


//Logout
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    register, 
    logout, 
    login,

}

export default authService