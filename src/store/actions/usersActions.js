export const onLoad = () => {
    return (dispatch) => {
        dispatch({type: 'DATA_LOADING'})
    }
}

export const usersList = (query) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(onLoad())
        console.log(query)
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/users`, params:{perPage:1}, method: 'GET'})
            .then(res => {
                dispatch({type: 'USERS_LOAD_SUCCESS', data: res.data})
            })
            .catch(err => {
                dispatch({type: 'USERS_LOAD_FAILED', err: err.response.data})
            })
    }
}
