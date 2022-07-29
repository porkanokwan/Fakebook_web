import { createContext, useEffect, useState } from "react";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../service/localStorage";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ทุกครั้งที่ refresh หน้า browser user จะเท่ากับ null ต้องเช็คทุกครั้งที่ refresh หน้า page ว่ามีค่า token อยู่ไหม ถ้ามีให้เอาข้อมูล user ออกมา
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          const resMe = await axios.get("/profile");
          setUser(resMe.data.user);
        }
        navigate("/login");
      } catch (err) {
        console.log(err);
        removeAccessToken();
        navigate("/login");
      }
    };
    fetchMe();
  }, []);

  const signup = async (input) => {
    const res = await axios.post("/auth/register", input);
    setAccessToken(res.data.token);
    const resMe = await axios.get("/profile");
    setUser(resMe.data.user);
  };

  const login = async ({ emailOrphone, password }) => {
    const res = await axios.post("/auth/login", { emailOrphone, password });
    setAccessToken(res.data.token);
    const resMe = await axios.get("/profile");
    setUser(resMe.data.user);
  };

  console.log(user);

  const logout = () => {
    removeAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signup, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };
