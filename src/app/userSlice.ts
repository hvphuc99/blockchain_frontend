import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
  privateKey: cookies.get('privateKey') || null,
  publicKey: cookies.get('publicKey') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    savePrivateKey: (state, action) => {
      state.privateKey = action.payload;
      cookies.set('privateKey', action.payload, { path: '/' });
    },
    removePrivateKey: (state) => {
      state.privateKey = null;
      cookies.remove('privateKey', { path: '/' });
    },
    savePublicKey: (state, action) => {
      state.privateKey = action.payload;
      cookies.set('publicKey', action.payload, { path: '/' });
    },
    removePublicKey: (state) => {
      state.privateKey = null;
      cookies.remove('publicKey', { path: '/' });
    },
  },
});

const { reducer, actions } = userSlice;
export const { savePrivateKey, removePrivateKey, savePublicKey, removePublicKey } = actions;
export default reducer;
