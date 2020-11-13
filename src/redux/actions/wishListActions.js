import { createAction } from '@reduxjs/toolkit';

export const wishListActions = {
    addToWishList : createAction('ADD_TO_WISHLIST'),
    deleteFromWishlist : createAction('DELETE_FROM_WISHLIST')
}
