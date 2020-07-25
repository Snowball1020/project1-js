import React, {useEffect, useState} from "react"
import {Container} from "react-bootstrap"
import Axios from "axios"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"


const Index = function ({user}) {

    const [items, setItems] = useState([])
    
    useEffect(()=>{
        (async () => {
            await getItems()
        })()
    },[])

    const getItems = async () => {
        //Hit index path in backend
        const itemsResp = await Axios.get("/api/items")
        //if the response was 200, set the value to items
        if(itemsResp.status === 200) setItems(itemsResp.data)
        //now "items" is available return statement
    }

    const deleteItem = async item =>{

        try{
            //Hit delete path in backend
            const resp = await Axios.post("/api/items/delete",{
                id:item._id
            })    
            if(resp.status === 200) toast("The item deleted successfully",{
                type:toast.TYPE.WARNING
            })
            //and update with the latest data
            getItems()    
        }catch(error){
            toast("There was an issue deleting this item",{
                type:toast.TYPE.ERROR
            })
        }
    }

    return(
        <Container className="my-5">

            <h4 className="reservation-list">Welcome {user.fullname}</h4>     
            <h5 className="reservation-list mt-4">Item List</h5>
            
            <div className="content">

                { items && items.map( (item, i) => (
                     <div key={i} >
                       <div className="card">

                            <div className="card-header text-white bg-dark" >
                                Seller: <span className="productName">{item.user.fullname} </span> <span className="time"> {item.updatedAt} </span>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">Product Name : {item.name} </h5>
                                <p className="card-title">Description : {item.description}</p>
                                <p className="card-text">Price : ${item.price}</p>
                                <p className="card-text">Status : {item.status}</p>

                                <Link className="btn btn-primary mr-2" to={{pathname:"/items/show", 
                                state:{id:item._id}}} >View details</Link>

                                {user && user.email === item.user.email ? (
                                    <>        
                                        <Link className="btn btn-success mr-2"  to={{pathname:"/items/edit", 
                                        state:{id:item._id}}}>Edit</Link>

                                        <button className="btn btn-danger" type="button" onClick={()=> deleteItem(item)}>
                                        Delete
                                        </button>
                                    </>
                                 ) : null }
                            </div>
                            
                        </div>
                        <br/>
                     </div>       
                    ))}

              </div>
                
        </Container>
        )
    }

export default Index