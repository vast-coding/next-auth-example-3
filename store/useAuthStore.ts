import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface AuthStoreInterface {
  authenticated: boolean // a boolean value indicating whether the user is authenticated or not
  setAuthentication: (val: boolean) => void // a function to set the authentication status
  user: any // an object that stores user information
  setUser: (user: any) => void // a function to set user information
}

export const useAuthStore = create<AuthStoreInterface>((set) => ({
  authenticated: false, // initial value of authenticated property
  user: {}, // initial value of user property
  setAuthentication: (val) => set((state) => ({ authenticated: val })), // function to set the authentication status
  setUser: (user) => set({ user }), // function to set user information
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useAuthStore);
}