import axios from 'axios';
import decode from 'jwt-decode';
const api = 'http://cdn.umdsoft.uz/api/order';
const headers = {
    "Authorization" : `Bearer ${localStorage.getItem('token')}`
}
let userID ;
if(localStorage.getItem('token')){
    userID = decode(localStorage.getItem('token')).id;
}
else{
    userID = null;
}

export const orderService = {
    addOrder : data =>{
        return axios.post(`${api}/add`,data, {headers})
    }
}