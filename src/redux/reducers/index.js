import { combineReducers } from 'redux';
import userReducer from './userReducer';
import langReducer from './langReducer';
import categoryReducer from './categoryReducer';
import storeReducer from './storeReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';

export const rootReducer = combineReducers({
    user : userReducer,
    lang : langReducer,
    category : categoryReducer,
    stores : storeReducer,
    products : productReducer,
    cart : cartReducer,
    wishlist : wishlistReducer
})