const initState = {
    success: false,
    formSending: false,
    error: false
}

const usersReducers = (state = initState, action) => {
    switch (action.type) {
        case 'FORM_SENDING' :
            return {
                ...state,
                formSending: true
            }
        case 'USERS_UPDATE_SUCCESS':
            return {
                ...state,
                formSending: false,
                success: true
            }
        case 'USERS_UPDATE_FAILED' :
            return {
                ...state,
                formSending: false,
                error: action.err,
            }

        default:
            return state
    }
}
export default usersReducers
