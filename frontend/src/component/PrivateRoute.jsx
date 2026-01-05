import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../store/store";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useContext(StoreContext);

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
