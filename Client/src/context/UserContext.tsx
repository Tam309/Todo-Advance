import { createContext, Dispatch, SetStateAction } from "react";

// Define the User interface
interface User {
  email: string;
  password: string;
  token?: string;
}

// Define the context type for UserContext
interface UserContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
}

// Create the context with an initial null value
const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
export type { User, UserContextType };
