import { User } from "../types";
import { api } from "./api";

interface AuthResponse {
  token: string;
  user: User
};

async function singIn(githubCode: string) {
  return api.post<AuthResponse>('/authenticate', {
    code: githubCode,
  });
}

export const AuthService = {
  singIn,
}