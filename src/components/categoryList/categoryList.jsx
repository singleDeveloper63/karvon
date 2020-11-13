import React, { useState ,useEffect} from 'react';
import './categoryList.scss';

function CategoryList({data,type,  onClose}){
    const [active,setActive] = useState(data[0]._id)
    const [activeSub,setActiveSub] = useState([]);


    const [activeList , setActiveList] = useState(data || []);
    const [activeParent,setActiveParent] = useState({ type : "parent" , value : {}})
    const [mobile , setMobile] = useState(false);
    useEffect(()=>{

        if(window.innerWidth<900){
            setMobile(true)
        }else{
            setMobile(false)
        }

        function Responsive(){
            if(window.innerWidth<900){
                setMobile(true)
            }else{
                setMobile(false)
            }
        }

        window.addEventListener("resize",Responsive)

        return(()=>{
            window.removeEventListener("resize",Responsive)
            document.body.classList.remove("disableScroll")
        })
    },[])


    if(mobile){
        
        document.body.classList.add("disableScroll")
        return(
            <div className={`mobileCategory`}>
                <div className="content">
                    <div className="categoryTitle">
                        <button onClick={()=>{
                            setActiveList(data);
                            setActiveParent({ type : "parent" , value : {} })
                        }}> <i className="bx bx-left-arrow-alt"></i> </button>
                        <h4>Kategoriyalar</h4>
                        <button onClick={()=>onClose()}> <i className="bx bx-x"></i> </button>
                    </div>
                    <div className="activeParent">
                        {
                            activeParent.type === "child" ? <Radio active value={activeParent.value._id} title={`${activeParent.value.name[type]} (barchasi)`}
                                id={activeParent.value._id} name="parent" onSelect={val => console.log(val)}/> : ""
                        }
                    </div>
                    <div className="activeChilds">
                        {
                            activeList.map((cat , index)=>{
                                return(
                                    <Radio key={`${index}${cat.name.uz}`} value={cat._id} title={cat.name[type]}
                                        id={cat._id} name="category" onSelect={value => {
                                            setActiveList(cat.children);
                                            setActiveParent({type : "child" , value : cat});
                                        }}/>
                                )
                            })
                        }
                    </div>
                    <button className="getProducts">Ko'rish</button>
                </div>
            </div>
        )
    }else{
        return(
            <div className={`categoryList`}>
                <div className="listItems">
                    <ul className="generalCategories">
                        {
                            data.map((item,index)=>{
                                return(
                                    <li className={`${item._id === active ? "active" : ""}`} onMouseMove={ ()=>{
                                        if(item.children.length>0){
                                            setActiveSub([].concat(item.children))
                                            setActive(item._id)
                                        }
                                    }} key={item.name['uz']}> {item.name[type]} {item.children.length>0 && <i className="bx bx-right-arrow-alt"></i>} </li>
                                )
                            })
                        }
                    </ul>
                    <ActiveCategory type={type} data={activeSub}/>
                </div>
            </div>
        )
    }
}

function Radio({value , title , name , onSelect , id , active = false}){
    return(
        <div className="radio">
            <label htmlFor={id}> {title} </label>
            <input checked={active} type="radio" name={name} value={value} onChange={(e)=>onSelect(e.target.value)} id={id}/>
        </div>
    )
}

function ActiveCategory({data , type}){
    return(
        <div className="activeCategory">
            <div className="row">
                {
                    data.map((item,index)=>{
                        return(
                            <div key={item.name.uz} className="col-12 col-md-6 col-xl-4">
                                <div className="subSub">
                                    {item.name[type]} 
                                </div>
                                {
                                    item.children.length>0 &&
                                    <>
                                        <ul className="lastSub">
                                            {
                                                item.children.map((item,index)=>{
                                                    return(
                                                        <li key={item.name.uz}> {item.name[type]} </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategoryList;