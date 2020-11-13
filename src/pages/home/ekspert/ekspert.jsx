import React, { useState } from 'react'
import st from './ekspert.module.scss'
import cx from 'classnames'
import Slider from 'react-slick'
import { BlogCard } from '../../../components'
import { connect } from 'react-redux';


const Ekspert = (props) => {
    
    const [cardData,setCardData] = useState(props.data)

    return (
        <div className={cx(st.ekspert)}>
            <div>
                <h1 className={cx('home_blog_title')}> {props.lang.lang.blogexpert} </h1>
                <Slider arrows={false} dots={false} autoplay autoplaySpeed={3000} slidesToShow={4}
                slidesToScroll={2} responsive={[
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
                        cardData.map((i,index)=>{
                            return(
                                <BlogCard data={i} key={i._id}/>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}

const mstp = state => (state);

export default connect(mstp,null)(Ekspert);