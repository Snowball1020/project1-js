import React, {useEffect, useState} from "react"
import {Container} from "react-bootstrap"
import Axios from "axios"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"


//YourItems page is identical to index expect for fetching data that belongs to the logged in user only
const YourItems = function ({user}) {

    const [items, setItems] = useState([])
    
    useEffect(()=>{
        (async () => {
            await getItems()
        })()
    },[])

    const getItems = async () => {
        //fetching all data that belongs to the logged in user 
        const itemsResp = await Axios.get("/api/items/youritems")
        if(itemsResp.status === 200) setItems(itemsResp.data)
    }

    const deleteItem = async item =>{
 
        try{
            const resp = await Axios.post("/api/items/delete",{
                id:item._id
            })    
            if(resp.status === 200) toast("The item deleted successfully",{
                type:toast.TYPE.WARNING
            })
            getItems()    
        }catch(error){
            toast("There was an issue deleting this item",{
                type:toast.TYPE.ERROR
            })
   
        }
    }

    return(
        <Container className="my-5">

            <h4 className="reservation-list">Hello {user.fullname}</h4>     
            <h5 className="reservation-list mt-4">Your Items</h5>
            
            <div className="content">
                { items && items.map((item,i) => (
                     <div key={i} >
                       <div className="card">

                            <div className="card-header text-black bg-light" >
                            Seller: <span className="productName">{item.user.fullname} </span> <span className="time"> {item.updatedAt} </span>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">Product Name : {item.name} </h5>

                                <p className="card-title">Description : {item.description}</p>
                                <p className="card-text">Price : ${item.price}</p>
                                <p className="card-text">Status : {item.status}</p>

                                {user ? (
                                    <>
                                        <Link className="btn btn-primary mr-2" to={{pathname:"/items/show", 
                                        state:{id:item._id}}} >View details</Link>
            
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
    
                    <Link to="/items" className="btn btn-secondary mt-2">Back</Link>

                    </div>
                
                </Container>
            )
    }

export default YourItems