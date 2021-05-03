import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
  privateKey: cookies.get('privateKey') || null,
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
  },
});

const { reducer, actions } = userSlice;
export const { savePrivateKey, removePrivateKey } = actions;
export default reducer;
