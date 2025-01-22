import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function AdminPrivateRoute() {

    const currentUser = useSelector((state) => state.user.currentUser)
    console.log("currentUser:", currentUser);

  return currentUser && currentUser.isAdmin ? (
      <Outlet />
  ) : (
      <Navigate to="/signin" />
  );
  //if the user is authenticated show the children(Outlet) otherwise navigate to sign in Navigate is a component
}

export default AdminPrivateRoute
