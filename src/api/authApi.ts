import axiosClient from './axiosClient';

const authApi = {
  login: (privateKey: string): Promise<{ privateKey: string; success: string }> => {
    const url = '/login';
    const body = {
      privateKey,
    };

    return axiosClient.post(url, body);
  },

  registerRootUser: (): Promise<any> => {
    const url = '/generatePrivateKey';

    const body = {};

    return axiosClient.post(url, body);
  },
};

export default authApi;
