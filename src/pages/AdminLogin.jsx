import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = "123456";
const AUTH_KEY = "family-tree-admin-auth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login() {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      navigate("/admin");
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>دخول المشرف</h2>
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={login}>دخول</button>
    </div>
  );
}
