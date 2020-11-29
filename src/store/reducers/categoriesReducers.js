const initState = {
    loading: false,
    categories: null,
    pagination: null,
    loadError: null
}

const categoriesReducers = (state = initState, action) => {
    switch (action.type) {
        case 'CATEGORIES_LOADING' :
            return {
                ...state,
                loading: true,
            }
        case 'CATEGORIES_LOAD_SUCCESS':
            return {
                ...state,
                loading: false,
                pagination: {
                    totalItems: action.data.totalItems,
                    totalPage: action.data.totalPages,
                    limit: action.data.limit,
                    currentPage: action.data.currentPage
                },
                categories: action.data.items
            }
        case 'CATEGORIES_LOAD_FAILED' :
            return {
                ...state,
                loadError: 'Oops, on a eu un problème pendant le chargement de la liste',
                loading: false
            }
        default:
            return state
    }
}

export default categoriesReducers