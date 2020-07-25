import React from "react"
import { useState } from "react"
import Axios from "axios"
import { Form, Container } from "react-bootstrap"
import {toast} from "react-toastify"

import {Redirect} from "react-router-dom"

const Login = ({setUser}) => {

    //Take inputs from users and put it in to object
    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })


    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault()

        try{
            //hit authenticate path with user input data
            const resp = await Axios.post("/authenticate",inputs)

            if(resp.status === 200){
                setUser(resp.data.user)
                toast("You have successfully logged in",{
                    type:toast.TYPE.SUCCESS
                })
                setRedirect(true)
            }else{
                toast("Failed to  log in, Please check your credentials",{
                    type:toast.TYPE.ERROR
                })
                
            }
    
        }catch(error){

            toast("Failed to  log in, Please check your credentials",{
                type:toast.TYPE.ERROR
            })        
        }

    }

    //take inputs from users and store them into value
    const handleInputChange = event => {
        event.persist();
        const {name, value} = event.target
        setInputs(inputs => ({...inputs, [name]: value}))

    }

    //if redirect was true, take the user to /items
    if(redirect)return <Redirect to="/items"/>

    return(

            <Container className="container">

                <header>
                    <h1>Login</h1>
                </header>

                <hr/>

                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <label htmlFor="email">Email:</label>
                        <Form.Control type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
                    </Form.Group>

                    <Form.Group>
                        <label htmlFor="password">Password:</label>
                        <Form.Control  type="password" name="password" onChange={handleInputChange} value={inputs.password} required/>
                    </Form.Group>

                    <Form.Group>
                        <button className="btn btn-primary">Login</button>
                    </Form.Group>
                </Form>

            </Container>

    )
}

export default Login