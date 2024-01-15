import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_CART, CONFIRM_CART, REMOVE_FROM_WISHLIST, UPDATE_CART_ITEM } from "../ActionTypes";

export const addItemToCart = data => ({
    type: ADD_TO_CART,
    payload: data,
})

export const updateCartItem = (productId, quantityCart, priceCart) => ({
    type: UPDATE_CART_ITEM,
    payload: {
      productId,
      quantityCart,
      priceCart,
    },
  });

export const removeFromCart = index => ({
    type: REMOVE_FROM_CART,
    payload: index,
})

export const confirmCart = () => ({
    type: CONFIRM_CART,
});

export const addToWishlist = data => ({
    type: ADD_TO_WISHLIST,
    payload: data,
})


export const removeFromWishlist = index => ({
    type: REMOVE_FROM_WISHLIST,
    payload: index,
})
