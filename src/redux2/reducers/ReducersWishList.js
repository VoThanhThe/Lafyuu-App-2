import { REMOVE_FROM_WISHLIST, ADD_TO_WISHLIST } from "../ActionTypes";

const initialState = {
    favorites: [],
  };

export const ReducersWishlist = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
              };
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                favorites: state.favorites.filter(item => item._id !== action.payload),
            };
        default:
            return state;
    }
}
