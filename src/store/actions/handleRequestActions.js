export const loading = () => {
    return (dispatch) => {
        dispatch({type: 'DATA_LOADING'})
    }
}

export const loadingError = () => {
    return (dispatch) => {
        dispatch({type: "DATA_LOADING_ERROR"})
    }
}

export const loadData = ({url, query}) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(loading())
        console.log('LOAD_DATA')
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/${url}`, params: query, method: 'GET'})
            .then(res => {
                dispatch({type: "DATA_LOADING_SUCCESS", data: res.data})
            })
            .catch(err => {
                dispatch(loadingError())
            })
    }
}

export const resetProps = () => {
    return (dispatch) => {
        dispatch({type: 'RESET_PROPS'})
    }
}