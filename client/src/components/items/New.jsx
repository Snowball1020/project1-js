import React, {useState} from "react"
import {Form, Container} from "react-bootstrap"
import Axios from "axios"
import {Redirect} from "react-router-dom"
import {toast} from "react-toastify"

const New = function () {


    const [inputs, setInputs] = useState({
        name:"",
        description:"",
        price:"",
        status:"ON SALE"
    })


    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault()

        try{
            const resp = await Axios.post("/items",inputs)

            if(resp.status === 200){
    
                toast("You have posted your item successfuly",{
                    type:toast.TYPE.SUCCESS
                })
    
                setRedirect(true)
            }else{
                toast("There was an issue posting your item",{
                    type:toast.TYPE.ERROR
                })
    
            }

        }catch(error){
                toast("There was an issue posting your item",{
                    type:toast.TYPE.ERROR
                })

        }
    }

    const handleInputChange = event => {
        event.persist();
        const {name, value} = event.target
        setInputs(inputs => ({...inputs, [name]: value}))

    }

    if(redirect) return (<Redirect to="/items"/>)


    return(
        <Container>
            <header>
                <h1>New Item</h1>
            </header>
            
            <div>
                <Form onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            name="name"
                            onChange={handleInputChange}
                            value={inputs.name}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            onChange={handleInputChange}
                            value={inputs.description}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            name="price"
                            onChange={handleInputChange}
                            value={inputs.price}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Status:</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            onChange={handleInputChange}
                            defaultValue={inputs.status || "ON SALE"}
                        >
                            <option value="ON SALE">ON SALE</option>
                            <option value="SOLD OUT">SOLD OUT</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <button type="submit" className="btn btn-primary">Post Item</button>
                    </Form.Group>

                </Form>

            </div>


        </Container>


    )

}

export default New