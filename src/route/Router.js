import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../component/layout/AuthLayout";
import SideBar from "../component/layout/sidebar/SideBar";
import { AuthContext } from "../contexts/AuthContext";
import FriendPage from "../pages/FriendPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPages";
import ProfilePage from "../pages/ProfilePage";

export default function Router() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<AuthLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="friends" element={<SideBar />}>
              <Route path="" element={<FriendPage />} />
              <Route path="request" element={<FriendPage />} />
              <Route path="suggestion" element={<FriendPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}
