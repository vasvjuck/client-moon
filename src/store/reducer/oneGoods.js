const ONE_GOODS = "ONE_GOODS";

export const initialState = {
    oneGoods: {},
    error: null
}

export const OneGoodsAction = {
    type: ONE_GOODS,
}

export const oneGoodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OneGoodsAction.type:
            return { ...state, oneGoods: action.payload }
        default:
            return state
    }
}

