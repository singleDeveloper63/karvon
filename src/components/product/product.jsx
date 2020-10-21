import React , { useEffect , useState } from 'react';
import {connect} from 'react-redux';
import st from './product.module.scss';
import cl from 'classnames';
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';



function Product({props,data}){

    
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
                <img src={`http://umdsoft.uz${data.images[0]}`} alt={data.title.ru}/>
                <div className={st.product_link}>
                    <Link to={`/products/${data._id}`}> Ko'rish </Link>
                </div>
            </div>
            <span className={st.product_new}>Yangi</span>
            <div className={st.product_body}>
                <div className="d-flex align-items-center justify-content-between">
                    <button tooltip="Yoqtirganlarga" className={st.flat}> <i className="fa fa-fw fa-heart"></i>  <span className="tooltiptext">Yoqtirganlarga</span></button>
                        <ReactStars
                            classNames={st.rating}
                            count={5}
                            size={18}
                            isHalf={true}
                            emptyIcon={<i className="fa fa-fw fa-star"></i>}
                            filledIcon={<i className="fa fa-fw fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            color="#ddd"
                        />
                    <button tooltip="" className={st.flat}> <i className="fa fa-fw fa-share-alt"></i> <span className="tooltiptext">Ulashish</span></button>
                    </div>
                <h4 className={st.product_title}> {data.title.uz} </h4>
                <h3 className={st.product_price}> {format(data.price)} SUM </h3>
            </div>
        </div>
    )
}



const mstp = state => (state);
export default connect(mstp,null)(Product)