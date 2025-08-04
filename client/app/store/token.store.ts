import { create } from 'zustand';

type TokenStore =  {
  token : string | null;
  setToken: (token: string) => void;
}

export const tokenStore = create<TokenStore>((set) => ({
    token:null ,
    setToken: (token :string ) => set({ token }),
    }));

