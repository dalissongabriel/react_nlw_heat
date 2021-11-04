import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types";

interface AuthContextData {
  user: User | null;
  singInUrl: string;
  singOut: () => void;
}

interface AuthResponse {
  token: string;
  user: User
};

interface AuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);
  const singInUrl = 'http://localhost:4000/github';

  async function singIn(githubCode: string) {
    const response = await api.post<AuthResponse>('/authenticate', {
      code: githubCode,
    });

    const {token, user} = response.data;
    localStorage.setItem('@dowhile:token', token); 
    setUser(user);
  }

  function singOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(()=>{
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);
      singIn(githubCode);
    }
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem('@dowhile:token');
    if (token) {
      // all request before this, send authorization in header :)
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>('/profile').then(response => {
        setUser(response.data);
      });
    }
  },[]) 

  const providerValue = {
    singInUrl: singInUrl,
    singOut: singOut,
    user: user,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}