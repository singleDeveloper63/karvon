import React, { useEffect } from 'react'
import st from './blog_card.module.scss'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import {  connect } from 'react-redux';
import parse from 'react-html-parser';

const BlogCard = (props) => {
    const { data } = props;
    const { lang ,type } = props.lang;

    return (
        <div className={cx('blogCard')}>    
            <div className={st.card}>
                <div className={cx(st.card_header)}>
                    <img src={`http://umdsoft.uz${data.image}`} alt="" className={cx(st.card_img,'img-fluid w-100 h-100')}/>
                </div>
                <div className={cx(st.card_title)}>
                    <Link to={`/blog/experts/${data._id}`} className={cx(st.card_title_link)}>{data.title[type]}</Link>
                    <div className={cx(st.content)}>
                        <span className={cx(st.content_span)}>
                            <span className={cx(st.avtor)}> {lang.author} :</span> Admin
                        </span>
                        <span className={cx(st.content_span)}>
                            {data.createdAt.slice(0,10)}
                        </span>
                        <span className={cx(st.content_span)}>
                            <i className={cx('fas fa-eye', st.eye)}></i>
                            {data.views}
                        </span>
                    </div>
                </div>
                <div className={cx(st.text)}>
                    <p className={cx(st.text_p)}>
                        {parse(data.description[type])}
                    </p>
                </div>
                <div>
                    <Link to={`/blog/experts/${data._id}`} className={cx(st.link)}>
                        { lang.reedMore }
                    </Link>
                </div>
            </div>
        </div>

    );
}

const mstp = state => (state);

export default connect(mstp,null)(BlogCard);