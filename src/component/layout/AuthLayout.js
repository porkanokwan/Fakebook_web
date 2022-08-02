import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import PostContextProvider from "../../contexts/PostContext";

// Layout สำหรับหน้าที่ authenticate ผ่านมาแล้ว (login เข้ามาแล้ว)
function AuthLayout() {
  return (
    <div>
      <Header />
      <div className="min-vh-100 tw-pt-14">
        <PostContextProvider>
          {/* ครอบแค่ Outlet เพราะ Post จะต้องใช้ในหน้า Home และ Profile ดังนั้น ให้ครอบแค่ Outlet เวลามีการเปลี่ยนแปลงจะได้ render ใหม่แค่ Outlet*/}
          <Outlet />
        </PostContextProvider>
      </div>
    </div>
  );
}

export default AuthLayout;
