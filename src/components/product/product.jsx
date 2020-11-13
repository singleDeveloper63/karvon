import React , { useEffect , useState } from 'react';
import {connect} from 'react-redux';
import st from './product.module.scss';
import cl from 'classnames';
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import wishlist from '../../pages/wishlist/wishlist';



function Product(props){
    let isHave = false;
    
    if(props.wishlist.items.find( item => item.id === props.data._id && item)){
        isHave = true
    }else{
        isHave = false;
    }
    const [inWishlist , setInWishlist] = useState(isHave);
    function format(str){
        let a = "";
        while(str.length>2){
            a = str.slice(str.length-3,str.length)+" "+a;
            str = str.slice(0,str.length-3)
        }
        a=str+" "+a;
        return a;
    }

    return(
        <div className={cl(st.product,"card")} >
            <div className={st.product_head}>
                <img src={`http://umdsoft.uz${props.data.images[0]}`} alt={props.data.title.ru}/>
                <div className={st.product_link}>
                    <Link to={`/products/${props.data._id}`}> Ko'rish </Link>
                </div>
            </div>
            <span className={st.product_new}>Yangi</span>
            <div className={st.product_body}>
                <div className="d-flex align-items-center justify-content-between">
                    <button tooltip="Yoqtirganlarga" onClick={ () => {
                        if(!inWishlist){
                            setInWishlist(true);
                            props.addToWishlist({ comId : props.data.company._id ,  image : props.data.images[0] , title : props.data.title , price : props.data.price , id : props.data._id  })
                        }else{
                            setInWishlist(false);
                            props.removeFromWishlist(props.data._id)
                        }
                    }} className={cl(st.flat , inWishlist ? st.scaleUp  : st.scaleDown )}>
                        <i className={`fa${inWishlist ? '' : 'r'} fa-fw fa-heart`}></i>  <span className="tooltiptext">Yoqtirganlarga</span>
                    </button>
                        <ReactStars
                            classNames={st.rating}
                            count={5}
                            size={13}
                            isHalf={true}
                            emptyIcon={<i className="fa fa-fw fa-star"></i>}
                            filledIcon={<i className="fa fa-fw fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            color="#ddd"
                        />
                    <button tooltip="" className={st.flat}> <i className="fa fa-fw fa-share-alt"></i> <span className="tooltiptext">Ulashish</span></button>
                    </div>
                <h4 className={st.product_title}> {props.data.title.uz} </h4>
                <h3 className={st.product_price}> {format(props.data.price)} SUM </h3>
            </div>
        </div>
    )
}



const mstp = state => (state);
const mdtp = dispatch => ({
    addToWishlist : payload =>{
        dispatch({ type : 'ADD_TO_WISHLIST' , payload : payload })
    },
    removeFromWishlist : id =>{
        dispatch({type : 'DELETE_FROM_WISHLIST' , payload : id})
    }
})
export default connect(mstp,mdtp)(Product)