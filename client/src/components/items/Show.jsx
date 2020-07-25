import React, {useEffect, useState} from "react"
import {Container, Form} from "react-bootstrap"
import Axios from "axios"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"


const Show = function (user) {
    //taking item id
    const id = user.location.state.id
    //taking item data
    const [item, setItem] = useState([])
    //taking user full name
    const [owner, setOwner] = useState([])
    //taking a value of sold out or on sale
    const [availability, setAvailability] = useState(true)
    //taking a value of bought item
    const [soldItem, setSoldItem] = useState([])

    //envoked once the path was hit
    useEffect(()=>{
        (async () => {
            await getShow()
        })()
    },[])

    //getShow fetches one particular selected item
    const getShow = async () => {
        //hit show path with clicked item
        const itemResp = await Axios.get(`/items/${id}`)
        //take user fullname ans set it to owner 
        setOwner(itemResp.data.user.fullname)
        //take the bought item and its id
        setSoldItem(itemResp.data._id)

        //if the res from backedn was 200, set the item value to item 
        if(itemResp.status === 200) setItem(itemResp.data)
        //if the taken item has status SOLD OUT, availability goes False
        if(itemResp.data.status === "SOLD OUT"){
            setAvailability(false)
        }

    }


    const handleSubmit = async event => {
        event.preventDefault()

        try{
            //Hit buy path in backend attached with cliked item id
            const resp = await Axios.post("/items/buy", {_id:soldItem})
            if(resp.status === 200){
    
                toast("You have bought this item. Thank you for your shopping!! ",{
                    type:toast.TYPE.SUCCESS
                })
                //and update page with the latest data
                getShow()
            }else{
                toast("There was an issue buying this item",{
                    type:toast.TYPE.ERROR
                })
    
            }

        }catch(error){
                toast("There was an issue buying your item",{
                    type:toast.TYPE.ERROR
                })

            }
    }


    return (

        <Container className="container mt-4">

            <h4>Product Detail </h4>     

                    <div className="card text-center">
                        <div className="card-header text-white bg-dark">
                        Seller: <span className="productName">{owner}</span> 
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">Product Name : {item.name}</h5>
                                <p className="card-title">Description : {item.description}</p>
                                <p className="card-text">Price : ${item.price}</p>
                                <p className="card-text">Status : {item.status}</p>

                           {availability ? (
                                <>
                                    <div>
                                    <strong className="onsale">This item is on sale!</strong>
                                    </div>

                                    <div>
                                        <Form onSubmit={handleSubmit} className="inline-form">
                                            <button type="submit" className="btn btn-success" >Buy Now</button>
                                        </Form>
                                    </div>
                                </>
                         ) : (

                            <div>
                            <strong className="soldout">This item is sold out and currenttly out of stock</strong>
                            </div>

                         )}
        
                            <Link to="/items" className="btn btn-secondary mt-2">Back</Link>

                        </div>
        
                        <div className="card-footer text-muted">
                            <span>Updated at : {item.createdAt}</span>
                        </div>
        
                    </div>
            
        </Container>

        )

    }

export default Show


