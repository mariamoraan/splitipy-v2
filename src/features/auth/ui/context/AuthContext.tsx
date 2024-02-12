import { createContext } from "react";
import { User } from "../../domain/entities/User";


export const AuthContext = createContext<{
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}>({
  currentUser: null,
  setCurrentUser: (user: User | null) => { }
});
