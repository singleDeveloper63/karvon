import React , { useState , useEffect, createRef } from 'react';
import st from './cart.module.scss';
import { connect } from 'react-redux';
import cl from 'classnames';
import { Link } from 'react-router-dom';
import cart from '../../img/emptycart.png';

function Cart(props){

    function format(str){
        let a = "";
        while(str.length>2){
            a = str.slice(str.length-3,str.length)+" "+a;
            str = str.slice(0,str.length-3)
        }
        a=str+" "+a;
        return a;
    }


    const [items , setItems] = useState(props.cart.items);
    useEffect(()=>{
        setItems(props.cart.items)
    },[props.cart])
    return(
        <div className={st.cart}>
            <div className="container">
                <div className="row">
                    <div className={cl(st.cart_items,"col-12 col-lg-8 col-xl-9")}>
                        <h1> Savatcha </h1>
                        <div className="breadcrumb">
                            <Link className="breadcrumb-item" to='/'> Bosh sahifa </Link>
                            <Link className="breadcrumb-item" to='/cart'> Savatcha </Link>
                        </div>
                        <div className={st.cart_items_list}>
                            {
                                items.length>0 ? <CartItemsList/> : <Empty/>
                            }
                        </div>
                    </div>
                    <div className={cl("col-12 col-lg-4 col-xl-3 p-0 px-lg-2 my-5 my-lg-0")}>
                        <Shipping/>
                    </div>
                </div>
            </div>
        </div>
    )

    function Shipping(){

        return(
            <div className={st.cart_shipping}>
                <h4>sotib olish</h4>
                <ul>
                    <li>Barcha maxsulotlar soni : <span>{props.cart.count} dona</span></li>
                    <li>Maxsulotlarning umumiy narxi : <span>{format(String(Price()))} SUM</span></li>
                    <li>Chegirma : <span>0 SUM</span> </li>
                    <li>Yetkazib berish : <span>0 SUM</span></li>
                    <li>Barchasi bo'lib : <span>{format(String(Price()))} SUM</span> </li>
                </ul>
                <Link to='/cart'>Sotib olish</Link>
            </div>
        )
    }

    function Price(){
        let items = [];
        props.cart.items.forEach((item) =>{
            let price = item.product.price.replace(/\s/g, '');;
            items.push(Number(price)*Number(item.count))
        })

        
        const reducerr = (total , next)=>(total+next)
        
        let all = items.reduce(reducerr,0);

        return all;
    }

    function Empty(){
        return(
            <div className={st.empty}>
                <img src={cart} alt=""/>
                <p>Savatcha hozircha bo'sh  ,  siz savdoni <Link to='/products'>boshlashingiz mumkun !</Link></p>
            </div>
        )
    }


    function CartItemsList(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Rasmi</th>
                        <th>Nomi</th>
                        <th>Narxi</th>
                        <th>Miqdori</th>
                        <th>Umumiy</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        items.map((item,index)=>{
                            return(
                                <CreateItem item={item} index={index} key={`CartItem${index}`}/>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    function CreateItem({item,index}){

        const itemRef = createRef();

        return(
            <tr ref={itemRef}>
                <td> {index+1} </td>
                <td> <img src={`http://umdsoft.uz${item.product.image}`} alt=""/> </td>
                <td className={st.cart_item_price}> { item.product.title['uz'] } </td>
                <td> {format(item.product.price)} SUM</td>
                <td> <Counter onChange={ val => {
                    props.changeCount({count : val , id : item.product._id})
                }} defaultValue={item.count}/></td>
                <td> { format(String( Number(item.product.price.split(" ").join("")) * item.count )) } SUM </td>
                <td> <button onClick={()=>{
                    itemRef.current.classList.add(st.hide);
                    setTimeout(()=>{
                        props.removeItem(item.product._id)
                    },700)
                }}  className={st.deleter}> <i className="fa fa-fw fa-trash"></i> </button> </td>
            </tr>
        )
    }
}



function Counter({defaultValue , onChange}){
    const [count,setCount] = useState(defaultValue);

    return(
        <div className={st.counter}>
            <button onClick={()=>{
                setCount(count<2 ? count : count-1)
                onChange(count<2 ? count : count-1)
            }}>-</button>
            <input readOnly value={count} style={{appearance : "none" , WebkitAppearance : "none"}} type="number"/>
            <button onClick={()=>{
                setCount( prev => prev+1)
                onChange(count+1)
            }}>+</button>
        </div>
    )
}

const mstp = state => (state);
const mdtp = dispatch =>({
    removeItem : id => {
        dispatch({type : "REMOVE_FROM_CART",payload : id})
    },
    changeCount : ({count , id})=>{
        dispatch({ type : "EDIT_FROM_CART", payload : { count : count , id : id }})
    }
})
export default connect(mstp , mdtp)(Cart);