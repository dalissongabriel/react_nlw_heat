import { User } from "../types";
import { api } from "./api";

async function loadProfile(token?: string) {
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }

  return api.get<User>('/profile');
}

export const UserService = {
  loadProfile,
}