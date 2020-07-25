import React from "react"
import { useState } from "react"
import Axios from "axios"
import { Form, Container } from "react-bootstrap"
import {toast} from "react-toastify"

import {Redirect} from "react-router-dom"

const Register = ({setUser}) => {

    //Take inputs from users and put it in to object
    const [inputs, setInputs] = useState({
        firstName:"",
        lastName:"",
        email:"",
        emailConfirmation:"",
        password:"",
        passwordConfirmation:"",        
    })


    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault()

        try{
            //hit authenticate path with user input data
            const resp = await Axios.post("/api/users",inputs)

            if(resp.status === 200){
                setUser(resp.data.user)
                toast("You have successfully been registered, now Please log in with yuor credentials",{
                    type:toast.TYPE.DEFAULT
                })
                setRedirect(true)
            }else{
                toast("Failed to register",{
                    type:toast.TYPE.ERROR
                })
                
            }
    
        }catch(error){

            toast("Failed to register",{
                type:toast.TYPE.ERROR
            })        
        }

    }

    //take inputs from users and store them into value
    const handleInputChange = event => {
        event.persist();
        const {name, value} = event.target
        setInputs(inputs => ({...inputs, [name]: value}))
        console.log(inputs)

    }

    //if redirect was true, take the user to /items
    if(redirect)return <Redirect to="/login"/>

    return(

            <Container className="container">

                <header>
                    <h1>Register</h1>
                </header>

                <hr/>

                <Form onSubmit={handleSubmit}>

                    <Form.Group>
                        <label htmlFor="firstName">First Name:</label>
                        <Form.Control type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />
                    </Form.Group>

                    <Form.Group>
                        <label htmlFor="lastName">Last Name:</label>
                        <Form.Control type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />
                    </Form.Group>

                    <Form.Group>
                        <label htmlFor="email">Email:</label>
                        <Form.Control  type="email" name="email" onChange={handleInputChange} value={inputs.email} required/>
                    </Form.Group>

                    <Form.Group>
                        <label htmlFor="emailConfirmation">Email Conformation:</label>
                        <Form.Control  type="email" name="emailConfirmation" onChange={handleInputChange} value={inputs.emailConfirmation} required/>
                    </Form.Group>

                    <Form.Group>
                        <label htmlFor="password">Password:</label>
                        <Form.Control  type="password" name="password" onChange={handleInputChange} value={inputs.password} required/>
                    </Form.Group>

                    <Form.Group>
                        <label htmlFor="passwordConfirmation">Password Confirmation:</label>
                        <Form.Control  type="password" name="passwordConfirmation" onChange={handleInputChange} value={inputs.passwordConfirmation} required/>
                    </Form.Group>

                    <Form.Group>
                        <button className="btn btn-primary">Register</button>
                    </Form.Group>


                </Form>

            </Container>

    )
}

export default Register