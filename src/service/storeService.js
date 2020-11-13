import axios from 'axios';
const api = 'http://cdn.umdsoft.uz/api/company/';
const headers = {
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
}

export const storeApi = {
    getStores : () => {
        return axios.get(`${api}all`)
    },
    createStore : data =>{
        return axios.post(`${api}create`,data,{ headers })
    },
    getStoreById : id => {
        return axios.get(`${api}${id}`)
    }
}