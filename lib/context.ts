import { createContext } from 'react';
import { User } from '@firebase/auth';

export const UserContext = createContext<UserContextData>({ user: null, email: null, loading: null });

export interface UserContextData {
  user: User | undefined | null;
  email: string | undefined | null;
  loading: boolean | undefined | null;
}
