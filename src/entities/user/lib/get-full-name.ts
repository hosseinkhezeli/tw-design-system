import { User } from "../types/user.types";


export const getFullName = (user: User): string =>
  user.fullName || user.username;
