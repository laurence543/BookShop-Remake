import { CART_ADD_TO_CART, CART_REMOVE_FROM_CART } from "./actionTypes";

export const addToCart = (book) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach(x => {
        if (x.id === book.id) {
            alreadyExists = true;
            x.count++;
        }
    });
    if (!alreadyExists) {
        cartItems.push({...book, count: 1});
    }
    dispatch({
        type: CART_ADD_TO_CART,
        payload: { cartItems }
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
export const removeFromCart = (items, book) => (dispatch) => {
    const cartItems = items.slice().filter(
        x => x.id != book.id
    );
    dispatch({type: CART_REMOVE_FROM_CART, payload: { cartItems } });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
