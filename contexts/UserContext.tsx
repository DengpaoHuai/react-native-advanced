import { apiClient } from "@/lib/api-client";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  currentUser: User | null;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const useUser = () => useContext(UserContext);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    apiClient.get("users").then((response) => {
      setCurrentUser(response.data[0]);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
