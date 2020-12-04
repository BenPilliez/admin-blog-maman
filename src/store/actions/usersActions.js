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
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/users`, data: {id:ids}, method: 'DELETE'})
            .then(res => {
                toast.success('Utilisateur(s) supprimé(s)')
                dispatch({type: 'USERS_DELETE_SUCCESS'})
            }).catch(err => {
            console.error(err)
            toast.error('Oops on a eu problème pendant la suppression')
            dispatch({type: 'USERS_DELETE_ERROR'})
        })
    }
}

export const resetState = () => {
    return (dispatch) => {
        console.log('RESET_STATE')
        dispatch({type: 'reset'})
    }
}
