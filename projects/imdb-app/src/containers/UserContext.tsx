import React, { useState } from 'react';

import { User } from '../graphql/types';

export type UserLogin = Pick<User, 'name' | 'username' | 'email'>;

interface UserContextType {
  user: UserLogin | null;
  setUser: React.Dispatch<React.SetStateAction<UserLogin | null>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = React.createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserLogin | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
