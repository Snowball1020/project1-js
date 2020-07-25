import React, {useState, useEffect} from "react"
import {Form, Container} from "react-bootstrap"
import Axios from "axios"
import {Redirect} from "react-router-dom"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"

const Edit = function (props) {
    //Getting Items ID
    const id = props.location.state.id

    const [inputs, setInputs] = useState({
        name:"",
        description:"",
        price:"",
        status:"ON SALE"
    })

    const [redirect, setRedirect] = useState(false)

    //useEffect is triggered once as soon as the routs was hit
    useEffect(()=>{
        (async () => {
            //Hit edit path in backedn
            const itemResp = await Axios.get(`/api/items/${id}`)
            if(itemResp.status === 200) setInputs(itemResp.data)
        })();
    },[])


    //handleSubmit is excuted once Form submit
    const handleSubmit = async event => {
    
        event.preventDefault()

        try{
            //hit update path attached inputs data
            const resp = await Axios.post("/api/items/update",inputs)

            if(resp.status === 200){
    
                toast("You have updated your item successfuly",{
                    type:toast.TYPE.INFO
                })
                //if update was successful, set redirect true
                setRedirect(true)
            }else{
                toast("There was an issue updating your item",{
                    type:toast.TYPE.ERROR
                })
            }

        }catch(error){
                toast("There was an issue updating your item",{
                    type:toast.TYPE.ERROR
                })

            }
    }

    //HandleInputChande happens every time changes occured in input field
    const handleInputChange = event => {
        event.persist();
        const {name, value} = event.target
        setInputs(inputs => ({...inputs, [name]: value}))
    }

    //if redirect was true then take the user to /items
    if(redirect) return (<Redirect to="/items"/>)

    return(
        <Container>
            <header>
                <h1>Edit / Update Item</h1>
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
                        <button type="submit" className="btn btn-primary">Update Item</button>
                    </Form.Group>

                </Form>

                <Link to="/items" className="btn btn-secondary mt-2">Back</Link>

            </div>

        </Container>

    )

}

export default Edit