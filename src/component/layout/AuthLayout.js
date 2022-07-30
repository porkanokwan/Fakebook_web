import Header from "./header/Header";
import { Outlet } from "react-router-dom";

// Layout สำหรับหน้าที่ authenticate ผ่านมาแล้ว (login เข้ามาแล้ว)
function AuthLayout() {
  return (
    <div>
      <Header />
      <div className="min-vh-100 tw-pt-14">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
