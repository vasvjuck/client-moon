import { combineReducers } from "redux";
import { userReducer } from '../reducer/addUserReducer';
import { goodsReducer } from '../reducer/allGoods'
import { oneGoodsReducer } from '../reducer/oneGoods'



export const rootReducer = combineReducers({
    user: userReducer,
    goods: goodsReducer,
    oneGoods: oneGoodsReducer,
})