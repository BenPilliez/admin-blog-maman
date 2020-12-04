const initState = {
    formSending: false,
    success: false,
    error: null
}

const categoriesReducers = (state = initState, action) => {
    switch (action.type) {
        case 'FORM_SENDING' :
            return {
                ...state,
                formSending: true,
                success: false,
                error: false,
            }
        case 'CATEGORIES_SUCCESS':
            return {
                ...state,
                formSending: false,
                success: true
            }
        case 'CATEGORIES_FAILED' :
            return {
                ...state,
                error: 'Oops, on a eu un problème',
                formSending: false
            }
        case 'CATEGORIES_STATE_RESET':
            return {
                ...state,
                formSending: false,
                success: false,
                error: false
            }
        default:
            return state
    }
}

export default categoriesReducers
