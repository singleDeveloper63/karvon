import React , { useEffect , useRef, useState } from 'react';
import st from './wishlist.module.scss';
import cl from 'classnames';
import decode from 'jwt-decode';
import { connect  } from 'react-redux';
import { orderService } from '../../service/orderService';

function WishList(props){
    const [count , setCount] = useState(props.wishlist.count)
    const [items , setItems] = useState(props.wishlist.items);

    useEffect(()=>{
        setItems(props.wishlist.items)
    },[props.wishlist])
    
    return(
        <div className={st.wishlist}>
            <div className="container p-0">
                <h1 className={st.page_header}>Tanlanganlar</h1>
                <div className={st.wishlist_list}>
                    <div className="row">
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="row">
                                {
                                    items.length>0 ?
                                    <>
                                        {
                                            items.map( (item,index) => {
                                                return(
                                                    <div className="col-6 col-md-4 col-lg-4 col-xl-3 px-3 border-bottom px-lg-2">
                                                        <WishListCard key={`${item.title.uz}${index}`} data={item}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </> :
                                    <WishlistEmpty/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


    function WishListCard({data}){
        const isHave = props.cart.items.find( item => item.product._id === data.id && item);
        const [hic , setHic] = useState(Boolean(isHave))
        const cardRef = useRef();
        const btnRef = useRef()

        function format(str){
            let a = "";
            str = str.split('').join('');
            while(str.length>2){
                a = str.slice(str.length-3,str.length)+" "+a;
                str = str.slice(0,str.length-3)
            }
            a=str+" "+a;
            return a;
        }

        useEffect(()=>{
            return () =>{

            }
        },[])

        function makeOrder(){
            let userID ;
            if(localStorage.getItem('token')){
                userID = decode(localStorage.getItem('token')).id;
            }
            else{
                userID = null;
            }
            if(userID){
                orderService.addOrder({ userId : userID , productId : data.id , companyId : data.comId , number : 1})
                    .then( res =>{
                    })
                    .catch( err =>{
                    })
            }
        }

        return(
            <div ref={cardRef} className={st.wishlist_cart} id={`${data.title.uz}${data.id}`}>
                <div className={st.img}>
                    <img src={`http://umdsoft.uz${data.image}`} alt=""/>
                    <div>
                        <button onClick={() => makeOrder()} className={st.buy}> Sotib olish </button>
                    </div>
                </div>
                <div className={st.wishlist_cart_body}>
                    <h4 className={st.wishlist_cart_price}> {format(data.price)}SUM </h4>
                    <div className={st.vertical}>
                        <p> {data.title.uz} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam illum id dolorum quo quod quae magni, dolorem ea libero cumque, incidunt vero neque, perspiciatis porro dolores aliquid excepturi nobis fuga.</p>
                        <div>
                            <button  ref={btnRef} disabled={hic} onClick={()=>{
                                btnRef.current.classList.add(st.btnAnim)
                                setTimeout(()=>{
                                    props.addToCart({ count : 1 , product : { image : data.image , title : data.title, price : data.price , _id : data.id } });
                                },600)
                            }}>Savatchaga</button>
                            <button onClick={(e)=>{
                                cardRef.current.classList.add(st.hide)
                                setTimeout(()=>{
                                    props.deleteFromWishlist(data.id);
                                },600)
                            }}> <i className="fa fa-fw fa-trash"></i> </button>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

function WishlistEmpty(){
    return(
        <div className={st.empty}>
            <p>"Tanlanganlar" ro'yxati hozircha bo'sh</p>
        </div>
    )
}

const mstp = state => (state);
const mdtp = dispatch =>({
    deleteFromWishlist : id => {
        dispatch({type : 'DELETE_FROM_WISHLIST' , payload : id})
    },
    addToCart : (payload) =>{
        dispatch({ type : "ADD_TO_CART" , payload : payload })
    }
})
export default connect(mstp,mdtp)(WishList);