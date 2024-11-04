import { useState, ReactNode } from "react";
import UserContext, { User } from "./UserContext"; // Adjusted import
import axios from "axios";
import BaseUrl from "../baseurl";

// Define the props for UserProvider
interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const userFromSessionStorage = sessionStorage.getItem("user");
  const initialUser: User = userFromSessionStorage
    ? JSON.parse(userFromSessionStorage)
    : { email: "", password: "" };

  const [user, setUser] = useState<User>(initialUser);

  const signup = async (): Promise<void> => {
    const headers = { headers: { "Content-Type": "application/json" } };
    try {
      await axios.post(`${BaseUrl}/user/register`, user, headers);
      setUser({ email: "", password: "" });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signIn = async (): Promise<void> => {
    const headers = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.post(`${BaseUrl}/user/login`, user, headers);
      const token = response.data.token;
      setUser({ ...response.data, token });
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
      setUser({ email: "", password: "" });
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signup, signIn }}>
      {children}
    </UserContext.Provider>
  );
}
