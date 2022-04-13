const ADD_USER = "ADD_USER";


export const initialState = {
    userData: {},
    error: null
}

export const UserAction = {
    type: ADD_USER,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserAction.type:
            return { ...state, userData: action.payload }
        default:
            return state
    }
}

