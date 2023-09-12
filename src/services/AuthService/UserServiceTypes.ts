import { User } from "../../models/user.model"

export interface UserService {
    error: Error | undefined,
    loading: boolean,
    performLogin: (data: User) => Promise<boolean>
  }