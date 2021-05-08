import { IBlock, ITransaction } from 'features/Wallet/pages/TransactionHistory';
import axiosClient from './axiosClient';

const walletApi = {
  getBalance: (): Promise<{ balance: number }> => {
    const url = '/getBalance';

    return axiosClient.get(url);
  },
  sendTransaction: (address: string, amount: number): Promise<{ success: boolean }> => {
    const url = '/sendTransaction';
    const body = {
      address,
      amount,
    };

    return axiosClient.post(url, body);
  },
  getTransactionPool: (): Promise<{ transactionPool: ITransaction[] }> => {
    const url = '/transactionPool';

    return axiosClient.get(url);
  },
  mine: (): Promise<{ newBlock: IBlock }> => {
    const url = '/mine';

    return axiosClient.post(url);
  },
  getBlockchain: (): Promise<{ blockchain: IBlock[] }> => {
    const url = '/blockchain';

    return axiosClient.get(url);
  },
};

export default walletApi;
