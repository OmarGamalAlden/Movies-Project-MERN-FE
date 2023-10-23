import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/signin" />;
  } else {
    return props.children;
  }
}
