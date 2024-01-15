// import {CAP_NHAT_EMAIL, CAP_NHAT_ID} from '../reducers/infoReducer';

import { ADD_PRODUCT, DELETE_PRODUCT } from "../reducers/productReducer";


export const addProduct = (products) => async dispatch => {
    try {

        await console.log("Bat dau goi len sever");
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
        await console.log("DA CAP NHAT EMAIL LEN SEVER");

        dispatch({
            type: ADD_PRODUCT,
            payload: {
                id: products.id,
                title: products.title,
                imageURL: products.imageURL,
                priceNew: products.priceNew
            },
        })
    } catch (error) {
        console.log("Error: ", error);
    }
};