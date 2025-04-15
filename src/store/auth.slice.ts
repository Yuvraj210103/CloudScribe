import { IUser } from '@/@types/api.response.types';
import { StateCreator } from 'zustand';

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userSignOut: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: true,
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  userSignOut: () => {
    console.log('sign out');
  },
});
