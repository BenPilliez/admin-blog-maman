export const formSending = () => {
    return (dispatch) => {
        dispatch({type: 'POST_FORM_SENDING'})
    }
}


export const createPost = (data) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch(formSending())
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts`, data: data, method: 'POST'})
            .then(res => {
                toast.success('Post ajouté')
                dispatch({type: 'POST_SUCCESS'})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: 'POST_FAILED'})
            })
    }
}

export const updatePost = (data, id) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        dispatch(formSending())
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/posts/${id}`, data: data, method: 'PUT',
            headers: {}
        })
            .then(res => {
                toast.success('Mise à jour effectuée')
                dispatch({type: 'POST_SUCCESS'})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: 'POST_FAILED'})
            })
    }
}

export const setPublished = (id, value) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({
            url: `${process.env.REACT_APP_BASE_URL}/posts/published/${id}`,
            data: {published: value},
            method: 'PUT'
        })
            .then(res => {
                if (res.data.published === false) {
                    toast.success('Post hors ligne')
                } else {
                    toast.success('Post publié')
                }
                dispatch({type: 'POST_SUCCESS'})
            })
            .catch(err => {
                toast.error('Oops on a un problème')
                dispatch({type: 'POST_FAILED'})
            })
    }
}

export const deletePost = (id) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts/${id}`, method: 'DELETE'})
            .then(res => {
                toast.success('Post supprimé')
                dispatch({type: 'POST_SUCCESS'})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème')
                dispatch({type: 'POST_FAILED'})
            })
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({type: 'POST_STATE_RESET'})
    }
}
