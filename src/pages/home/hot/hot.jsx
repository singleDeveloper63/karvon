import React from 'react'
import st from './hot.module.scss'
import cx from 'classnames'
import { useEffect ,useState } from 'react';
import service from '../../../img/it_service.jpg'
import ind_1 from '../../../img/industry_1.jpg'
import ind_2 from '../../../img/industry_2.jpg'
import ind_3 from '../../../img/industry_3.jpg'
import ind_4 from '../../../img/industry_4.jpg'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import parser from 'react-html-parser';
import Slider from 'react-slick'

const Hot = (props) => {

    const { lang } = props.lang;
    const { type } = props.lang;
    return (
        <div className={cx(st.hot)}>
            <div>
                <h1 className={cx('home_blog_title')}> { lang.bloghome } </h1>
                <Slider arrows={false} dots={false} slidesToShow={4} infinite responsive={[
                    {
                        breakpoint : 500,
                        settings : {
                            slidesToShow : 1,
                            slidesToScroll : 1
                        }
                    },
                    {
                        breakpoint : 800,
                        settings : {
                            slidesToShow : 2,
                            slidesToScroll : 1
                        }
                    },
                    {
                        breakpoint : 1100,
                        settings : {
                            slidesToShow : 3,
                            slidesToScroll : 2
                        }
                    },
                    {
                        breakpoint : 1300,
                        settings : {
                            slidesToShow : 4,
                            slidesToScroll : 2
                        }
                    }
                ]}>
                    {
                        props.data.map((item,index)=>{
                            return(
                                <HotCard key={item._id} data={item} type={type}/>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}

function HotCard({data , type}){
    return(
        <div className={cx(st.box)}>
            <img src={`http://umdsoft.uz${data.image}`} alt=""/>
            <Link to="" className={cx(st.content_h2)}>
                {data.title[type]}
            </Link>
            <p>
                { parser(data.description[type]) }
            </p>
            <button>Davomini o'qish</button>
        </div>
    )
}

const mstp = state => (state);

export default connect(mstp,null)(Hot);