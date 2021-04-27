import { ORDER_CREATE, ORDER_CLEAR, CART_CLEAR } from "./actionTypes";
import axios from "axios";

export const createOrder = (books) => (dispatch) => {
    axios.post('http://127.0.0.1:8000/access/api/order', {
        books_data: books
    })
    .then((res) => {
        console.log(res);
        localStorage.removeItem("cartItems");
        dispatch({ type: CART_CLEAR });
    })
    .catch(error => {
        console.log(error)
        console.log(error.response.data)
    });
}

export const clearOrder = () => (dispatch) => {
    dispatch({ type: ORDER_CLEAR });
}
