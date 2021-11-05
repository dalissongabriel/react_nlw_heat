export interface User {
  id: string;
  name: string;
  avatar_url: string;
  github_id: number;
  login: string;
}

export type Message =  {
  id: string, 
  text: string,
}