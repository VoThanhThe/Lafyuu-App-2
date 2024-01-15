export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

const initialState = {
    // id: "",
    // title: "",
    // imageURL: "",
    // priceNew: ""
    products: []
};

export default function actionForReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            {
                let products = [...state.products];
                products.push(action.payload);
                return {...state, products: products}
            }
        case DELETE_PRODUCT:
            {
                let products = [...state.products];
                products = products.filter((product) => {
                    return product.id !== action.payload.id;
                })
                return {...state, products: products}
            }
        default:
            return state;
    }
}