import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { ReactNode } from "react";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if(token){
    user = verifyToken(token);
  }
  const dispatch=useAppDispatch();
  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(logout())
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
