import { CART_ADD_TO_CART, CART_REMOVE_FROM_CART } from "../actions/actionTypes";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]")
}

const cartReducer = (state=initialState, action) => {
    switch (action.type) {
        case CART_ADD_TO_CART:
            return { cartItems: action.payload.cartItems };
        case CART_REMOVE_FROM_CART:
            return { cartItems: action.payload.cartItems };
        default:
            return state;
    }
}
export default cartReducer;
