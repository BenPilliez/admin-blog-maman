export const setPublished = (id, value) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/comments/published/${id}`, data:{published: value}, method:'PUT'})
            .then(res => {
                const message = value === true ? 'Le commentaire est en ligne' : 'Le commentaire est hors ligne'
                toast.success(message)
                dispatch({type: "COMMENT_PUBLISHED_SUCCESS"})
            })
            .catch(err => {
                toast.error('Oops on a eu un problème pendant la publication')
                dispatch({type: 'COMMENT_PUBLISHED_FAILED'})
            })
    }
}

export const deleteComments = (ids) => {
    return (dispatch, getState, {axiosInstance, toast}) => {
        axiosInstance({url:`${process.env.REACT_APP_BASE_URL}/comments`, data:{id: ids}, method:'DELETE'})
        .then(res => {
            toast.success('Commentaire(s) supprimé(s)')
            dispatch({type: 'COMMENT_DELETE_SUCCESS'})
        }).catch(err => {
            toast.error('Oops un problème est survenu pendant la suppression')
            dispatch({type: 'COMMENT_DELETE_FAILED'})
        })
    }
}

export const resetState = () => {
    return (dispatch) => {
        dispatch({type: 'COMMENT_RESET_STATE'})
    }
}
