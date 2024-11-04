import { useContext } from "react";
import UserContext, { UserContextType } from "./UserContext";

export default function UseUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseUser must be used within a UserProvider");
  }
  return context;
}
