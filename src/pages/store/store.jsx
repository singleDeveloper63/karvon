import React, {useEffect , useState} from 'react';
import { storeApi } from '../../service/storeService';
import { InnerLoader } from '../../components';
import './store.scss';

function Store(props){

    const [load , setLoad] = useState(true);
    const [store , setStore] = useState({});

    useEffect(()=>{
        storeApi.getStoreById(props.match.params.marketId)
            .then( res =>{
                setStore(res.data.data.company)
                console.log(res.data)
                setLoad(false)
            })
    },[])
    if(load){
        return(
            <InnerLoader/>
        )
    }else{
        return(
            <div className="oneStore">
            </div>
        )
    }
}

export default Store;