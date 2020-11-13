import React from 'react'
import st from './reyting.module.scss'
import cx from 'classnames'

import { ReytingCard } from '../../../components'
import { connect } from 'react-redux';
import radius from '../../../img/radius.jpg'
import media from '../../../img/media.jpg'
import imzo from '../../../img/imzo.jpg'


const Reyting = ({ lang }) => {
    
    const cardDate = [
        {img:radius, to:"", title:'MyBusiness.uz - Сеть магазинов электроники, бесплатная доставка, рассрочка'},
        {img:media, to:"", title:'MediaPark - Сеть магазинов электроники, бесплатная доставка, рассрочка'},
        {img:imzo, to:"", title:'IMZO - Сеть магазинов электроники, бесплатная доставка, рассрочка'}
    ]


    const card = cardDate.map((item, index) => (
        <div className={cx('col-sm-4')} key={index}>
            <div style={{height:'22rem', width:'100%', margin:'1rem 0'}}>
                <ReytingCard to={item.to} img={item.img} title={item.title} />
            </div>
        </div>
    ))
    
    return (
        <div className={cx(st.reyting)}>
            <div>
                <h1 className={cx('home_blog_title')}> {lang.lang.rate} </h1>
                <div className={cx('row')}>
                    {card}
                </div>
            </div>
        </div>
    );
}

const mstp = state => (state);

export default connect(mstp,null)(Reyting);