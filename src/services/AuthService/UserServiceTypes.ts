import { User } from "../../models/user.model"

export interface UserService {
    error: Error | undefined,
    loading: boolean,
    // handleLogin: (data: User) => Promise<boolean>
    performLogin: (data: User) => Promise<boolean>
  }