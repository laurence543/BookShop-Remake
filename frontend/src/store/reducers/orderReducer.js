import { ORDER_CREATE, ORDER_CLEAR } from "../actions/actionTypes";

const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE:
            return { order: action.payload };
        case ORDER_CLEAR:
            return { order: null };
        default:
            return state;
    }
}
export { orderReducer };
