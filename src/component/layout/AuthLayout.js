import Header from "./header/Header";
import { Outlet } from "react-router-dom";

// Layout สำหรับหน้าที่ authenticate ผ่านมาแล้ว (login เข้ามาแล้ว)
function AuthLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
