const Loading = () => {
    return (dispatch) =>{
        dispatch({type: "CATEGORIES_LOADING"})
    }
}

export const listCategories = () => {
        return (dispatch, getState, {axiosInstance}) => {
            dispatch(Loading())
            axiosInstance({ url: `${process.env.REACT_APP_BASE_URL}/category`, method:'GET'})
                .then(res => {
                    dispatch({type: "CATEGORIES_LOAD_SUCCESS", data: res.data.items})
                })
                .catch(err => {
                    dispatch({type: "CATEGORIES_LOAD_FAILED"})
                })
        }
}
