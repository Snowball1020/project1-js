import React from "react"
import {Container } from "react-bootstrap"

function About () {

    return(
        <Container className="card mt-4">
            <div className="card-header bg-success text-white">
            Welcome to Virtualmart App / Created by Yuki Miyazawa
            </div>
            <ul className="list-group list-group-flush">
            <li className="list-group-item">----------Instructions-----------</li>
            <li className="list-group-item"><strong>● Register</strong>  - A guest can register as a new user</li>
            <li className="list-group-item"><strong>● Login </strong> - A registered user can login as a user</li>
            <li className="list-group-item">----------Menu below is available only for a logged in user-----------</li>
            <li className="list-group-item"><strong>● View All Items</strong>  - A user can see all items on sale </li>
            <li className="list-group-item"><strong>● Viwe Details Button</strong>  - A user can see details of the item</li>
            <li className="list-group-item"><strong>● Buy Button</strong>  - A user can buy the item </li>
            <li className="list-group-item">(you can buy an item only if the status is ON SALE and if the item is someone elses (You can not buy an item you posted), once the item is purchesed, the status will be changed to SOLD OUT) </li>
            <li className="list-group-item"><strong>● Post Item</strong>  - A user can post a new Item</li>
            <li className="list-group-item"><strong>● Manege Your Post</strong>  - A user can list up all items you have posted</li>
            <li className="list-group-item"><strong>● Edit / Delete Button</strong>  - A user can edit and delete your posts (A user can edit only their own posts)</li>      
            </ul>
        </Container>
    )

}

export default About