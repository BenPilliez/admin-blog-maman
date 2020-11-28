const Loading = () => {
    return (dispatch) =>{
        dispatch({type: "CATEGORIES_LOADING"})
    }
}

export const listCategories = (query) => {
        return (dispatch, getState, {axiosInstance}) => {
            dispatch(Loading())
            axiosInstance({ url: `${process.env.REACT_APP_BASE_URL}/category`, query:query, method:'GET'})
                .then(res => {
                    dispatch({type: "CATEGORIES_LOAD_SUCCESS", data: res.data})
                })
                .catch(err => {
                    dispatch({type: "CATEGORIES_LOAD_FAILED"})
                })
        }
}
