import { Routes, Route } from "react-router-dom";
import AuthLayout from "../component/layout/AuthLayout";
import SideBar from "../component/layout/sidebar/SideBar";
import FriendPage from "../pages/FriendPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPages";
import ProfilePage from "../pages/ProfilePage";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<AuthLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="friends" element={<SideBar />}>
          <Route path="" element={<FriendPage />} />
          <Route path="request" element={<FriendPage />} />
          <Route path="suggestion" element={<FriendPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
