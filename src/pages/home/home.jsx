import React, { Component } from 'react'
import './home.scss'
import Premier from './premier/premier';
import Hot from './hot/hot';
import Ekspert from './ekspert/ekspert';
import Reyting from './reyting/reyting';
import Aksiya from './aksiya/aksiya';
import Hit from './hit/hit';
import Popular from './popular/popular';
import { InnerLoader } from '../../components'
import Axios from 'axios';


class Home extends Component {

state = {
    loading : true,
    data : {
        slider : [],
        experts : [],
        hot : []
    }
}

componentDidMount(){
    Axios.get('http://cdn.umdsoft.uz/api/ui')
        .then( res =>{
            this.setState({
                data : {
                    slider : res.data.slider,
                    experts : res.data.experts,
                    hot : res.data.goryachi
                }
            },()=>{
                this.setState({loading : false})
            })
        })
}

render() {
    if(this.state.loading){
        return(
            <InnerLoader/>
        )
    }else{
        return (
            <div className="home">
                <Premier data={this.state.data.slider}/>
                <Hot data={this.state.data.hot}/>
                <Ekspert data={this.state.data.experts}/>
                <Reyting/>
                <Aksiya data={this.state.data.experts}/>
                <Hit/>
                <Popular/>
            </div>      
        );
    }
}

}

export default Home;