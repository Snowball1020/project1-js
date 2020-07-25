import React, {useEffect, useState} from "react"
import {Container, Form} from "react-bootstrap"
import Axios from "axios"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"


const Show = function (user) {

    const id = user.location.state.id

    const [item, setItem] = useState([])

    const [owner, setOwner] = useState([])

    const [availability, setAvailability] = useState(true)

    const [soldItem, setSoldItem] = useState([])

    useEffect(()=>{
        (async () => {
            await getShow()
        })()
    },[])

    const getShow = async () => {
        const itemResp = await Axios.get(`/items/${id}`)
        console.log(itemResp.data.user.email)

        setOwner(itemResp.data.user.fullname)
        setSoldItem(itemResp.data._id)

        if(itemResp.status === 200) setItem(itemResp.data)

        if(itemResp.data.status === "SOLD OUT"){
            setAvailability(false)
        }

    }

    const handleSubmit = async event => {
        event.preventDefault()

        try{
            const resp = await Axios.post("/items/buy", {_id:soldItem})
            if(resp.status === 200){
    
                toast("You have bought this item. Thank you for your shopping!! ",{
                    type:toast.TYPE.SUCCESS
                })
    
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
                                <h5 className="card-title">Product Name: {item.name}</h5>
                                <p className="card-title">{item.description}</p>
                                <p className="card-text">Price: ${item.price}</p>
                                <p className="card-text">Status: {item.status}</p>



                           {availability ? (
                                <>
                                <div>
                                <strong>This item is on sale!</strong>
                                </div>

                            {user && owner !== owner.email ? (
                               <div>
                               <Form onSubmit={handleSubmit} className="inline-form">
                                  <button type="submit" className="btn btn-success" >Buy Now</button>
                                </Form>
                              </div>

                            ) : null}
                                </>
                         ) : (
                            <div>
                            <strong>This item is sold out and currenttly out of stock</strong>
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


