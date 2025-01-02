import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute() {

    const currentUser = useSelector((state) => state.user.currentUser)
    console.log("currentUser:", currentUser);

  return currentUser ? <Outlet/> : <Navigate to='/signin'/>
  //if the user is authenticated show the children(Outlet) otherwise navigate to sign in Navigate is a component
}

export default PrivateRoute
