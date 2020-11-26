import axios from "axios"

export const axiosInstance = axios.create({
    baseUrl: process.env.REACT_APP_BASE_URL
})
export const setAuthorization = (axiosInstance,token) => {

    if (token) {
        console.debug("On ajoute le token dans le header de la requête")
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        console.debug("On ajoute le token dans le header de la requête")
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}
