const initState = {
    formSending: false,
    success: false,
    categoriesLoadSuccess: false,
    categories: [],
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
        case 'CATEGORIES_SUCCESS_ADD':
            return {
                ...state,
                formSending: false,
                success: true,
                categories: [...state.categories, action.data]
            }

        case 'CATEGORIES_SUCCESS_UPDATE':

            return {
                ...state,
                formSending: false,
                success: true,
            }
            case 'CATEGORIES_SUCCESS_DELETE':

            return {
                ...state,
                formSending: false,
                success: true,
            }
        case 'CATEGORIES_FAILED' :
            return {
                ...state,
                error: 'Oops, on a eu un problème',
                formSending: false
            }
        case 'CATEGORIES_LOAD_SUCCESS' :
                return {
                    ...state,
                    categoriesLoadSuccess: true,
                    categories: action.data
                }
        case 'CATEGORIES_LOAD_FAILED' :
            return {
                ...state,
                categoriesLoadSuccess: false
            }

        case 'CATEGORIES_LOAD_RESET' :
            return {
                ...state,
                categoriesLoadSuccess: false,
                categories: []
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
