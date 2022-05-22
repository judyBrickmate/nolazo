import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/slices/userSlice";

export default function AuthRouter({ children }: { children: JSX.Element }) {
  const { isLogin } = useAppSelector(selectUser);

  let location = useLocation();

  const { user } = useAppSelector((state) => state.user);
  // console.log("whatsrole", user?.role);
  // const navigate = useNavigate();

  // if (user?.role === "업체관리자") {
  //   console.log(user?.role);
  //   return <Navigate to="/store-owner-order" state={{ from: location }} replace />;
  //   // navigate("/store-owner-order");
  // }

  // if (user?.role === "업체관리자") {
  //   return (
  //     <Navigate to="/store-owner-order" state={{ from: location }} replace />
  //   );
  // }

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <div style={{ marginLeft: "200px" }}>{children}</div>;
}
