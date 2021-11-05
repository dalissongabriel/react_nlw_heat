import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_TOKEN_USER_NAME } from "../constants";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { User } from "../types";

interface AuthContextData {
  user: User | null;
  singOut: () => void;
}

interface AuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);
  function getGithubCodeFromQueryString() {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);
      singIn(githubCode);
    }
  }

  async function singIn(githubCode: string) {
    try {
      const response = await AuthService.singIn(githubCode);
      const {token, user} = response.data;
      localStorage.setItem(LOCAL_STORAGE_TOKEN_USER_NAME, token);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  function loadUserFromLocalStorageWhenExists() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_USER_NAME);
    if (token) {
      UserService.loadProfile(token)
        .then(response => {
          setUser(response.data);
        });
    }
  }

  function singOut() {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_USER_NAME)
  }

  useEffect(() => getGithubCodeFromQueryString(), []);

  useEffect(() => loadUserFromLocalStorageWhenExists(), []);

  return (
    <AuthContext.Provider value={{singOut, user}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}