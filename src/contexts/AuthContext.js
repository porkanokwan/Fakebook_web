import { createContext, useState } from "react";
import { setAccessToken } from "../service/localStorage";
import axios from "../config/axios";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const signup = async (input) => {
    const res = await axios.post("/auth/register", input);
    setAccessToken(res.data.token);
    const resMe = await axios.get("/profile");
    setUser(resMe.data.user);
  };
  return (
    <AuthContext.Provider value={{ signup }}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };
