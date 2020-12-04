const initialState = {
    formSending: false,
    success: false,
    error: null
}

const postsReducers = (state = initialState, actions) => {

    switch (actions.type) {
        case 'POST_FORM_SENDING' :
            return {
                ...state,
                formSending: true,
                success: false,
                error: null
            }
        case 'POST_SUCCESS' :
            return {
                ...state,
                formSending: false,
                success: true
            }
        case 'POST_FAILED':
            return {
                ...state,
                error: 'Oops on a eu un problème'
            }
        case 'POST_STATE_RESET':
            return {
                formSending: false,
                success: false,
                error: null
            }
         default :
            return state
    }
}

export default postsReducers
