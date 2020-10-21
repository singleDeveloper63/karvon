import cartActions from '../actions/cartActions';
import { createReducer } from '@reduxjs/toolkit';

let initial;
if(localStorage.getItem('cart')){
    initial = JSON.parse(localStorage.getItem('cart'))
}else{
    initial = {  count : 0 , items : [] }
}

const CartReducer = createReducer(initial , builder => {
    builder
        .addCase(cartActions.addToCart.type , (state,action)=>{
            state.items.push(action.payload);
            state.count++;
            localStorage.setItem('cart',JSON.stringify(state));
            return state
        })
        .addCase(cartActions.removeFromCart.type , (state , action)=>{
            if(state.count>0){
                state.count--;
            }
            let items = state.items.filter( item => item.product._id !== action.payload && item);
            state.items = items;
            localStorage.setItem('cart',JSON.stringify(state))
            return state;
        })
        .addCase(cartActions.editFromCart.type , (state,action) =>{
            state.items.forEach( item =>{
                if(item.product._id === action.payload.id){
                    item.count = action.payload.count;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state));
            return state;
        })
        .addDefaultCase((state,action)=>(state))
})

export default CartReducer;