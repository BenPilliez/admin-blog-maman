export const formSending = () => {
    return (dispatch) => {
        dispatch({type: 'FORM_SENDING'})
    }
}

export const getCategories = () => {
    return (dispatch, {axiosInstance, toast}) => {
        axiosInstance({url:`${process.env.REACT_APP_BASE_URL}/category`, method:'GET'})
            .then()
    }
}

export const createCagory = (data) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch(formSending())
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/category`, data: data, method: 'POST'})
            .then(res => {
                toast.success('Catégorie ajoutée')
                dispatch({type: "CATEGORIES_SUCCESS"})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: "CATEGORIES_FAILED"})
            })
    }
}

export const updateCategory = (data, id) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch(formSending())
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/category/${id}`, data: data, method: 'PUT'})
            .then(res => {
                toast.success('Mise à jour effectuée')
                dispatch({type: "CATEGORIES_SUCCESS"})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: "CATEGORIES_FAILED"})
            })
    }
}

export const deleteCategory = (ids) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/category`, data: {id: ids}, method: 'DELETE'})
            .then(res => {
                toast.success('La catégorie a bien été supprimée')
                dispatch({type: 'CATEGORIES_SUCCESS'})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: 'CATEGORIES_FAILED'})
            })
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({type: 'CATEGORIES_STATE_RESET'})
    }
}
