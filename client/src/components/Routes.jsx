import React from "react"
import {Route, Switch} from "react-router-dom"

import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./sessions/Login"
import Logout from "./sessions/Logout"

import Items from "./items/Index"
import YourItems from "./items/YourItems"

import NewItem from "./items/New"
import EditItem from "./items/Edit"
import ShowItem from "./items/Show"

function Routes ({user , setUser}) {
    return(
        <Switch>

            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>

            <Route exact path="/login" render={
                renderProps => <Login 
                {...renderProps}
                setUser={setUser}
                />
            }/>
            
            <Route exact path="/logout" render={
                renderProps => <Logout 
                {...renderProps}
                setUser={setUser}
                />
            }/>
            
            <Route exact path="/items" render={
                renderProps => <Items
                {...renderProps}
                user={user}
                />    
            }/>

            <Route exact path="/items/youritems" render={
                renderProps => <YourItems
                {...renderProps}
                user={user}
                />    
            }/>
            
            <Route exact path="/items/new" component={NewItem}/>
            
            <Route exact path="/items/edit" component={EditItem}/>
            
            <Route exact path="/items/show" render={
                renderProps => <ShowItem
                {...renderProps}
                user={user}
                />    
            }/>


        </Switch>
    )
}

export default Routes