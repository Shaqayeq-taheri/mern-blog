import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollToTop=()=>{
    const {pathname} = useLocation()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname]) //if any changes happened to the path of the page
    return null

}

export default ScrollToTop