import React, { useEffect, useState } from 'react';

import { User } from '../graphql/types';

export type UserLogin = Pick<User, 'name' | 'username' | 'email'>;

interface UserContextType {
  user: UserLogin | null;
  setUser: (userState: UserLogin | null) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = React.createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserLogin | null>(null);

  function setUserState(userState: UserLogin | null) {
    localStorage.setItem('user', JSON.stringify(userState));
    setUser(userState);
  }

  useEffect(() => {
    try {
      const state = localStorage.getItem('user');
      if (state) {
        const parsedState = JSON.parse(state);
        setUser(parsedState);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
