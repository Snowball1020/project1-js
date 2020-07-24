import React from "react"
import {Link} from "react-router-dom"

function Nav ({user}) {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/"></Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
 
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/items">View All Items</Link>
                    </li>
                
                {user ? (
                    <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/items/new">Post Item</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/items/youritems">Manage Your Post</Link>
                    </li>
                    </>

                ) : null}
     
                </ul>

                   <ul className="navbar-nav">

 
                        {user ? (
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link">
                                        <i className="fa fa-sign-out"></i>
                                        Logout
                                    </Link>
                                </li>


                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/users/new" className="nav-link">
                                    <i className="fa fa-user-plus"></i>
                                    Register
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                    <i className="fa fa-sign-in"></i>
                                    Login
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>

            </div>
        </nav>
    )
}

export default Nav