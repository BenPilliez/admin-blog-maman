export const formSending = () => {
    return (dispatch) => {
        dispatch({type: 'FORM_SENDING'})
    }
}

export const createUser = (data) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch(formSending())
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/users/`, data: data, method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                toast.success('Utilisateur créé avec succès')
                dispatch({type: 'USERS_CREATE_SUCCESS', success: true})
            })
            .catch(err => {
                console.log(err.response.data)
                toast.error('Oops on a eu un problème')
                dispatch({type: 'USERS_CREATE_FAILED', err: err.response.data})
            })
    }
}

export const updateUser = (data, userId) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch(formSending())
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/users/${userId}`, data: data, method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                toast.success('Mise à jour effectuée avec succès')
                dispatch({type: 'USERS_UPDATE_SUCCESS', success: true})
            })
            .catch(err => {
                console.log(err.response.data)
                toast.error('Oops on a eu un problème')
                dispatch({type: 'USERS_UPDATE_FAILED', err: err.response.data})
            })
    }
}

export const deleteUsers = (ids) => {
    return (dispatch, getState, {axioInstance}) => {
        axioInstance({url: `${process.env.REACT_APP_BASE_URL}/users`, data: ids, method: 'DELETE'})
            .then(res => {
                console.log(res)
            }).catch(err => {
            console.error(err)
        })
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({type: 'reset'})
    }
}
