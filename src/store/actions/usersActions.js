export const onLoad = () => {
    return (dispatch) => {
        dispatch({type: 'DATA_LOADING'})
    }
}

export const usersList = () => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(onLoad())
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/users`, method: 'GET'})
            .then(res => {
                dispatch({type: 'USERS_LOAD_SUCCESS', data: res.data.items})
            })
            .catch(err => {
                dispatch({type: 'USERS_LOAD_FAILED', err: err.response.data})
            })
    }
}
