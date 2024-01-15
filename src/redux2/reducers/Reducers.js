import { ADD_TO_CART, REMOVE_FROM_CART, CONFIRM_CART, UPDATE_CART_ITEM } from "../ActionTypes";

const initialState = {
    cartItems: [],
};

export const Reducers = (state = initialState, action) => {
    switch (action.type) {
        // case ADD_TO_CART:
        //     return [...state, action.payload];
        // case REMOVE_FROM_CART:
        //     const deleteArray = state.filter((item, index) => {
        //         return index !== action.payload;
        //     });
        //     return deleteArray;
        case ADD_TO_CART:
            const existingItemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);

            console.log('Existing Item Index:', existingItemIndex);
            console.log('Current Cart Items:', state.cartItems);

            if (existingItemIndex !== -1) {
                console.log('Updating Existing Item...');

                // Nếu sản phẩm đã tồn tại trong giỏ hàng, thì thực hiện cập nhật số lượng và giá
                const updatedCartItems = state.cartItems.map((item, index) => {
                    if (index === existingItemIndex) {
                        console.log('Updating Quantity and Price for Item:', item);
                        return {
                            ...item,
                            quantityCart: item.quantityCart + 1, // Cập nhật số lượng (hoặc thực hiện logic tăng số lượng)
                            priceCart: action.payload.priceCart, // Cập nhật giá (hoặc thực hiện logic cập nhật giá)
                        };
                    }
                    return item;
                });

                console.log('Updated Cart Items:', updatedCartItems);

                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                console.log('Adding New Item to Cart...');

                const newCartItem = {
                    ...action.payload,
                    quantityCart: 1, // Mặc định số lượng là 1 khi thêm mới vào giỏ hàng
                    priceCart: action.payload.price, // Giá cả mặc định có thể lấy từ action.payload hoặc bạn có thể thiết lập mặc định khác
                };

                console.log('New Cart Item:', newCartItem);

                return {
                    ...state,
                    cartItems: [...state.cartItems, newCartItem],
                };
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload),
            };
        case UPDATE_CART_ITEM:
            const updatedCartItems = state.cartItems.map(item => {
                if (item._id === action.payload.productId) {
                    return {
                        ...item,
                        quantityCart: action.payload.quantityCart,
                        priceCart: action.payload.priceCart,
                    };
                }
                return item;
            });

            return {
                ...state,
                cartItems: updatedCartItems,
            };
        case CONFIRM_CART:
            return {
                ...state,
                cartItems: [], // Xóa toàn bộ giỏ hàng sau khi xác nhận đơn hàng
            };
        default:
            return state;
    }
}
