import React, { Component } from 'react'
import './app.scss';
import { Layout } from './hoc';
import { Switch, Route, Redirect } from 'react-router-dom';
import './fonts.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { connect } from 'react-redux';
import { categoryApi } from './service/categoryService';
import { productApi } from './service/productService';
import { storeApi } from './service/storeService';
import { Loader } from './components';

import { Home, Blogs, Blog, SignUp , OneStore , Product , Reset, Profil , Entercode ,  Store , Products , Cart , WishList} from './pages'

class App extends Component {
	state = {
            isRequest : true
        }
    componentDidMount(){
        categoryApi.getCategory()
            .then( res => {
                this.props.setCategory(res.data.categoryList)
                storeApi.getStores()
                    .then( res =>{
                        this.props.setStores(res.data);
                        productApi.getroducts()
                            .then( res =>{
                                this.props.setProducts(res.data);
                                this.setState({ isRequest : false });
                            })
                    })
            })
        }
    

	render(){
        if(this.state.isRequest){
            return(
                <div style={{position : "relative" , width : "100%", height: "100vh"}}>
                    <Loader/>
                </div>

            )
        }else{
            return(
                <div className="app">
                    <Switch>
                        <Layout>
                            <div className="page-contents">
                                <Route exact path='/' exact component={Home} />
                                <Route exact path='/blogs/'  component={Blogs} />
                                <Route exact path='/blogs/:id'  component={Blog} />
                                <Route exact path='/sign-up' component={SignUp} />
                                <Route exact path='/products' component={ Products }/>
                                <Route exact path='/products/:id' exact component={Product} />
                                <Route exact path='/profile' render={()=>{
                                    if(this.props.user.isLoggedIn){
                                        return(
                                            <Profil/>
                                        )
                                    }else{
                                        return(
                                            <Redirect to='/'/>
                                        )
                                    }
                                }} />
                                <Route exact path='/resetpassword' component={Reset}/>
                                <Route exact path='/entercode' component={Entercode}/>
                                <Route exact path='/market' component={ Store }/>
                                <Route exact path='/cart' component={Cart}/>
                                <Route exact path='/wishlist' component={ WishList } />
                                <Route exact path='/market/:marketId' component={OneStore}/>
                            </div>
                        </Layout>
                    </Switch>
                </div>
            )
		}	
	}

}

const mstp = state => (state);

const mdtp = dispatch => ({
    setCategory : (data) => {
        dispatch({ type : "setCategory" , payload : data })
    },
    setStores : (data) => {
        dispatch({type : "setStores", payload : data})
    },
    setProducts : data =>{
        dispatch({type : "setProducts" , payload : data})
    }
})
export default connect(mstp,mdtp)(App);
