import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// AuthStore Definition
interface AuthState {
  isAuthenticated: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  user: any;
  category: string | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: localStorage.getItem('accessToken') ? true : false,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  category: localStorage.getItem('category') || null,
};

interface AuthStore {
  authState: AuthState;
  login: (accessToken: string, user: any, refreshToken: string) => void;
  logout: () => void;
  updatedUser: (user: any) => void;
  updateAccessToken: (accessToken: string) => void;
  setCategory: (category: string) => void;
}

const useAuthStore = create<AuthStore>()(persist(
  immer((set) => ({
    authState: { ...initialAuthState },
    login: (accessToken: string, user: any, refreshToken: string) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      set(state => {
        state.authState.isAuthenticated = true;
        state.authState.accessToken = accessToken;
        state.authState.refreshToken = refreshToken;
        state.authState.user = user;
      });
    },
    updatedUser: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      set(state => {
        state.authState.user = user;
      });
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('category');
      set(state => {
        state.authState.isAuthenticated = false;
        state.authState.accessToken = null;
        state.authState.refreshToken = null;
        state.authState.user = null;
        state.authState.category = null;
      });
    },
    updateAccessToken: (accessToken: string) => {
      localStorage.setItem('accessToken', accessToken);
      set(state => {
        state.authState.accessToken = accessToken;
      });
    },
    setCategory: (category: string) => {
      localStorage.setItem('category', category);
      set(state => {
        state.authState.category = category;
      });
    },
  })), {
    name: 'authStore',
    storage: createJSONStorage(() => localStorage),
  }
));

export default useAuthStore;
