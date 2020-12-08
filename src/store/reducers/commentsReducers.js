const initState = {
    sending: false,
    success: false,
    error: false
}

const commentsReducers = (state = initState, actions) => {

    switch(actions.type) {
        case 'SENDING' :
            return {
                sending: true,
                success: false,
                error: null
            }
        case 'COMMENT_PUBLISHED_SUCCESS' :
            return {
                ...state,
                sending: false,
                success:true
            }
        case 'COMMENT_PUBLISHED_FAILED' :
            return {
                ...state,
                sending: false,
                error: true
            }
        case 'COMMENT_DELETE_SUCCESS' :
            return {
                ...state,
                sending: false,
                success: true
            }
        case 'COMMENT_DELETE_FAILED':
            return {
                ...state,
                sending: false,
                error: true
            }
        case 'COMMENT_RESET_STATE':
            return {
                sending: false,
                success: false,
                error: false
            }
        default :
            return state

    }
}

export default commentsReducers
