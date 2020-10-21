import React , { useEffect , useState } from 'react';
import st from './wishlist.module.scss';
import cl from 'classnames';
import { connect , useSelector } from 'react-redux';


function WishList(props){
    const cart = useSelector( state => state.cart.count);
    console.log(cart);

    return(
        <h1>Wish List</h1>
    )
}


const mstp = state => (state);
export default connect(mstp,null)(WishList);