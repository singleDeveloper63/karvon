import React from 'react'
import st from './aksiya.module.scss'
import cx from 'classnames'
import { connect } from 'react-redux';
import {BlogCard} from '../../../components'
import Slider from 'react-slick';

const Aksiya = ({lang,data}) => {

    const cardData = data;

    return (
       <div className={cx(st.aksiya)}>
           <div>
                <h1 className={cx('home_blog_title')}> {lang.lang.promotion} </h1>
                <Slider infinite arrows={false} dots={false} autoplay autoplaySpeed={3000} slidesToShow={4}
                slidesToScroll={2} responsive={
                    [
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
                    ]
                }>
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
export default connect(mstp)(Aksiya);