import { create } from 'zustand';
import { createAuthSlice } from './auth.slice';

export const useAuthState = create(createAuthSlice);
