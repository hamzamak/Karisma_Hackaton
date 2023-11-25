import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

// intercept requests  before they are handled by then or catch
API.interceptors.request.use((req)=> {
    if(secureLocalStorage.getItem('token'))  {
         req.headers.authorization = `Bearer ${secureLocalStorage.getItem('token')}`
    }
    return req ;
})


export const fetchRecettesByUser = () => API.get(`/recettes/fatch_all`); // fetchRooms by userId
export const deleteRecetteByID = (id) => API.delete(`/recettes/delete/${id}`);
export const addRecette = (formData) => API.post(`/recettes/add`, formData);
export const updateRecette = (formData) => API.put(`/recettes/update`, formData);




export const signIn = (formData) => API.post(`/users/signin`, formData);
export const signUp = (formData) => API.post(`/users/signup`, formData);