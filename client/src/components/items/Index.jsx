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

        const itemsResp = await Axios.get("/items")
        console.log(itemsResp.data)
        if(itemsResp.status === 200) setItems(itemsResp.data)
    }

    const deleteItem = async item =>{
 
        try{
            const resp = await Axios.post("/items/delete",{
                id:item._id
            })    
            if(resp.status === 200) toast("The item deleted successfully",{
                type:toast.TYPE.SUCCESS
            })
            getItems()    
        }catch(error){
            toast("There was an issue deleting this item",{
                type:toast.TYPE.ERROR
            })
   
        }
    }


//    console.log(items)
    return(
        <Container className="my-5">

            <h4 className="reservation-list">Welcome</h4>     
            <h5 className="reservation-list mt-4">Item List</h5>
            
            <div className="content">
                { items && items.map((item,i) => (

                        <div key={i} className="card">

                            <div className="card-header text-white bg-dark" >
                            Seller: <span className="productName"> {item.name} </span> <span className="time"> {item.updatedAt} </span>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">Product Name : {item.name} </h5>
                                <p className="card-title">{item.description}</p>
                                <p className="card-text">${item.price}</p>
                                <p className="card-text">{item.status}</p>

                                {user ? (
                                    <>
                                    <Link to="" className="btn btn-primary">View details</Link>
                                    <Link className="btn btn-success"  to={{pathname:"/items/edit", 
                                    state:{id:item._id}}}>Edit</Link>

                                        <input type="hidden" value="<%= item._id %>" name="id"/>
                                        <button className="btn btn-danger" type="button" onClick={()=> deleteItem(item)}>
                                        Delete
                                        </button>
                                    </>
                                ) : null }
                            </div>

                        </div>

                    ))}

                    </div>
                
                </Container>
            )
    }

export default Index