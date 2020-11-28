const initState = {
    loading: false,
    usersList: null,
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
                loading: false,
                usersList: action.data
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
