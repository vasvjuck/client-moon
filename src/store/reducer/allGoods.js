const ALL_GOODS = "ALL_GOODS";

export const initialState = {
    goods: [],
    error: null
}

export const GoodsAction = {
    type: ALL_GOODS,
}

export const goodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GoodsAction.type:
            return { ...state, goods: action.payload }
        default:
            return state
    }
}

