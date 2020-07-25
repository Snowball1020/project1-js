import React, {useState,useEffect} from "react"
import {Redirect} from "react-router-dom"
import Axios from "axios"
import {toast} from "react-toastify"

const Logout = ({setUser}) => {

    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        (async () => {
            try{
                const resp = await Axios.get("/api/logout")

                if(resp.status === 200){
                    setUser(false)
                    toast("You logged out",{
                        type:toast.TYPE.DARK
                    })
                    setRedirect(true)
                }
            }catch(error){
                toast("Failed to log out",{
                    type:toast.TYPE.ERROR
                })
            }
        })();
    }, [])

    if(redirect)return(<Redirect to="/"/>)

    return null
}

export default Logout