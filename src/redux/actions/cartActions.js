import { createAction } from '@reduxjs/toolkit';

const cartAction  = {
    addToCart : createAction('ADD_TO_CART'),
    removeFromCart : createAction('REMOVE_FROM_CART'),
    editFromCart : createAction('EDIT_FROM_CART')
}

export default cartAction;