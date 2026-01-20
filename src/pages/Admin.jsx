import { Navigate } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";

const AUTH_KEY = "family-tree-admin-auth";

export default function Admin() {
  const isAuth = localStorage.getItem(AUTH_KEY) === "true";

  if (!isAuth) {
    return <Navigate to="/admin-login" replace />;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "/admin-login";
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={logout}>تسجيل خروج</button>
      <AdminPanel />
    </div>
  );
}
