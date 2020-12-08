const initState = {
    loaded: false,
    data: [],
    pagination: {
        totalItems: 0,
        totalPage: 0,
        limit: 10,
        currentPage: 0
    },
    loadingError: false
}

const handleRequestReducers = (state = initState, action) => {

    switch (action.type) {
        case 'DATA_LOADING' :
            return initState
        case 'DATA_LOADING_ERROR' :
            return {
                ...state,
                loaded: true,
                loadingError: action.status === 404 ? 'Aucune donnée pour le moment' : 'Oops on a eu un problème en chargeant la liste'
            }
        case 'DATA_LOADING_SUCCESS' :
            return {
                ...state,
                loaded: true,
                pagination: {
                    totalItems: action.data.totalItems,
                    totalPage: action.data.totalPages,
                    limit: action.data.limit,
                    currentPage: action.data.currentPage
                },
                data: action.data.items
            }
        case 'DATA_RESET_STATE':
            return {
                loaded: false
            }
        default:
            return state
    }
}

export default handleRequestReducers
