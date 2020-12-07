export const formSending = () => {
    return (dispatch) => {
        dispatch({type: 'FORM_SENDING'})
    }
}

export const getCategories = () => {
    return (dispatch,getState, {axiosInstance, toast}) => {
        console.log("GET CATEGORIES")
        axiosInstance({url:`${process.env.REACT_APP_BASE_URL}/category`, method:'GET'})
            .then(res => {
                dispatch({type: 'CATEGORIES_LOAD_SUCCESS', data:res.data.items})
            }).catch(err => {
                toast.error('Oops un problème est survenu pendant le chargement des catégories')
            dispatch({type: 'CATEGORIES_LOAD_FAILED'})
        })
    }
}

export const createCategory = (data) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch(formSending())
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/category`, data: data, method: 'POST'})
            .then(res => {
                toast.success('Catégorie ajoutée')
                dispatch({type: 'CATEGORIES_SUCCESS_ADD', data: res.data})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: 'CATEGORIES_FAILED'})
            })
    }
}

export const updateCategory = (data, id) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch(formSending())
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/category/${id}`, data: data, method: 'PUT'})
            .then(res => {
                toast.success('Mise à jour effectuée')
                dispatch({type: 'CATEGORIES_SUCCESS_UPDATE', data:res.data})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: 'CATEGORIES_FAILED'})
            })
    }
}

export const deleteCategory = (ids) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/category`, data: {id: ids}, method: 'DELETE'})
            .then(res => {
                toast.success('La catégorie a bien été supprimée')
                dispatch({type: 'CATEGORIES_SUCCESS_DELETE', id:ids})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: 'CATEGORIES_FAILED'})
            })
    }
}

export const resetCategoriesLoaded = () => {
    return (dispatch) => {
        dispatch({type: 'CATEGORIES_LOAD_RESET'})
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({type: 'CATEGORIES_STATE_RESET'})
    }
}
