import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginUser, logoutUser } from "../../services/AuthService/auth.service";
import { User } from "../../models/user.model";

const AuthContext = createContext<{
  user: User | undefined;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
} | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const {
      success,
      user: authenticatedUser,
      error,
    } = await loginUser(email, password);
    setLoading(false);

    if (success) {
      setUser(authenticatedUser);
    } else {
      console.error("Login error:", error);
    }

    return success;
  };

  const logout = () => {
    logoutUser();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
