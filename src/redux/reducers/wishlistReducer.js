import { wishListActions } from '../actions/wishListActions';
import { createReducer } from '@reduxjs/toolkit';

let initial;
if(localStorage.getItem('wishList')){
    initial = JSON.parse(localStorage.getItem('wishList'))
}else{
    initial = {  count : 0 , items : [] }
}


const WishListReducer = createReducer( initial , (builder) =>{
    builder.
        addCase(wishListActions.addToWishList.type , (state , action)=>{
            state.count++;
            state.items.push(action.payload);
            localStorage.setItem('wishList' , JSON.stringify(state));
            return state;
        }).
        addCase(wishListActions.deleteFromWishlist.type , (state,action) =>{
            state.count --;
            let items = state.items.filter( item => item.id !== action.payload)
            state.items = items;
            localStorage.setItem('wishList' , JSON.stringify(state));
            return state;
        }).
        addDefaultCase((state , action)=>{
            return state
        })

})

export default WishListReducer;