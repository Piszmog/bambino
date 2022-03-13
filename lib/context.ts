import { createContext } from 'react';
import { User } from '@firebase/auth';

export const UserContext = createContext<UserContextData>({ user: null, displayName: null, loading: null });

export interface UserContextData {
  user: User | undefined | null;
  displayName: string | undefined | null;
  loading: boolean | undefined | null;
}
