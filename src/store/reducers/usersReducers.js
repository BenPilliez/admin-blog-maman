const initState = {
    loading: false,
    usersList: null,
    pagination: null,
    loadError: null
}

const usersReducers = (state = initState, action) => {
    switch (action.type) {
        case 'DATA_LOADING' :
            return {
                ...state,
                loading: true
            }
        case 'USERS_LOAD_SUCCESS' :
            return {
                ...state,
                pagination: {
                    totalItems: action.data.totalItems,
                    totalPage: action.data.totalPages,
                    limit: action.data.limit,
                    currentPage: action.data.currentPage
                },
                usersList: action.data.items,
                loading: false
            }
        case 'USERS_LOAD_FAILED' :
            return {
                ...state,
                loading: false,
                loadError: 'Oops on a eu un problème en récupérant la liste'
            }
        default:
            return state
    }
}
export default usersReducers
