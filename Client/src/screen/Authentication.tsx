import { Link, useNavigate } from "react-router-dom";
import React from "react";
import UseUser from "../context/UseUser";

export const AuthenticationMode = Object.freeze({
  LOGIN: "login",
  REGISTER: "register",
});

interface AuthenticationProps {
  authenticationMode: "login" | "register";
}

export default function Authentication({
  authenticationMode,
}: AuthenticationProps) {
  const { user, setUser, signUp, signIn } = UseUser();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (authenticationMode === AuthenticationMode.REGISTER) {
        await signUp();
        navigate("/signin");
      } else {
        await signIn();
        navigate("/");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h3>
        {authenticationMode === AuthenticationMode.LOGIN
          ? "Sign in"
          : "Sign up"}
      </h3>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Add onSubmit handler */}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button type="submit">
          {authenticationMode === AuthenticationMode.LOGIN ? "Login" : "Submit"}
        </button>
      </form>
    </div>
  );
}
