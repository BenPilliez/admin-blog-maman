export const loading = () => {
    return (dispatch) => {
        dispatch({type: 'DATA_LOADING'})
    }
}

export const loadingError = (status) => {
    return (dispatch) => {
        dispatch({type: "DATA_LOADING_ERROR", status})
    }
}

export const loadData = ({url, query}) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(loading())
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/${url}`, params: query, method: 'GET'})
            .then(res => {
                dispatch({type: "DATA_LOADING_SUCCESS", data: res.data})
            })
            .catch(err => {
                dispatch(loadingError(err.response.status))
            })
    }
}

export const resetRequest = () => {
    return (dispatch) => {
        dispatch({type: 'DATA_RESET_STATE'})
    }
}
