import axiosClient from './axiosClient';

const authApi = {
  login: (privateKey: string): Promise<{ publicKey: string }> => {
    const url = '/login';
    const body = {
      privateKey,
    };

    return axiosClient.post(url, body);
  },

  register: (): Promise<string> => {
    const url = '/register';

    const body = {};

    return axiosClient.post(url, body);
  },
};

export default authApi;
