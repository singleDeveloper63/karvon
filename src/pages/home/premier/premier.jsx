import React, { createRef, useEffect } from 'react'
import './premier.scss';
import { connect } from 'react-redux';
import Slider from 'react-slick'

const Premier = (props) => {

    const sliderRef = createRef();

    return (
        <div className="slider-premier">
            <div>
                <div className="slider-content">
                    <button onClick={()=>sliderRef.current.slickPrev()}> <i className="bx bx-chevron-left"></i> </button>
                    <Slider ref={sliderRef} autoplay={true} autoplaySpeed={3000} dots={false} arrows={false} className="slider">
                        {
                            props.data.map((item,index)=>{
                                return(
                                    <Slide data={item} key={item._id}/>
                                )
                            })
                        }
                    </Slider>
                    <button onClick={()=>sliderRef.current.slickNext()}> <i className="bx bx-chevron-right"></i> </button>
                </div>
            </div>
        </div>
    );
}

function Slide({data}){
    return(
        <div className="slide">
            <img src={`http://umdsoft.uz${data.image}`} alt={data._id}/>
            <a href={data.url} target="_blank"></a>
        </div>
    )
}

const mstp = state => (state);

export default connect(mstp,null)(Premier);