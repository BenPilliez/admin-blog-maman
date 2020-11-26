import {setAuthorization} from "../../config/axiosConfig";

export const login = (credentials) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/signin`, data: credentials, method: 'POST'})
            .then((res) => {
                setAuthorization(axiosInstance, res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                toast.success('Hello, bonne publication')
                dispatch({type: 'LOGIN_SUCCESS', user: res.data.user})
            })
            .catch(err => {
                toast.error(err.response.data.error)
                dispatch({type: 'LOGIN_FAILED', err: err.response.data.error})
            })
    }
}
