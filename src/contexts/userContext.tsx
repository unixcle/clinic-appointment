// src/contexts/UserContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  role: "doctor" | "patient" | "secretary";
  idCard: string;
  birthday: string;
  // هر چیز دیگه‌ای که بخوای
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type UserContextType = {
  user: User | null;
  status: AuthStatus;
  refetchUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const refetchUser = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:5000/api/v1/users/get-my-info",
        { withCredentials: true }
      );
      setUser(res.data?.data);
      setStatus(res.data?.data ? "authenticated" : "unauthenticated");
    } catch(error) {
      setUser(null);
      setStatus("unauthenticated");
      
    }
  };
  useEffect(() => {
    refetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{ user, status, refetchUser, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser باید داخل UserProvider استفاده شود");
  }
  return context;
};
