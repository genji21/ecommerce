import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
  const isLogged = useSelector((state) => state.user.isLogged);
  
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin
 return (
   <Route 
     render={(props) =>
       isLogged ? <Component {...props} /> : <Redirect to="/user/auth" />
     }
   />
 );
}
;

export default PrivateRoute;
