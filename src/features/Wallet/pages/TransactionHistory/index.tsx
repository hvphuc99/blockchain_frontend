import { Button, Col, message, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import walletApi from 'api/walletApi';
import ModalBlockDetail from 'features/Wallet/components/ModalBlockDetail';
import ModalTransactionDetail from 'features/Wallet/components/ModalTransactionDetail';
import { reverse, uniqBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import socket from 'socket';
import './styles.scss';

export interface ITxIn {
  txOutId: string;
  txOutIndex: number;
  signature: string;
}

export interface ITxOut {
  address: string;
  amount: number;
}

export interface ITransaction {
  id: string;
  txIns: ITxIn[];
  txOuts: ITxOut[];
}

export interface IBlock {
  index: number;
  data: ITransaction[];
  timestamp: number;
  difficulty: number;
  nonce: number;
  previousHash: string;
  hash: string;
  miner: string;
}

function TransactionHistory(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [blockchain, setBlockchain] = useState<IBlock[]>([]);
  const [visibleModalTransaction, setVisibleModalTransaction] = useState<boolean>(false);
  const [transactionDetail, setTransactionDetail] = useState<ITransaction>();
  const [visibleModalBlock, setVisibleModalBlock] = useState<boolean>(false);
  const [blockDetail, setBlockDetail] = useState<IBlock>();

  useEffect(() => {
    socket.on('newTransaction', (data: { newTransaction: ITransaction }) => {
      const { newTransaction } = data;
      setTransactions((prevTransaction: ITransaction[]) => uniqBy([newTransaction, ...prevTransaction], 'id'));
    });

    socket.on('newBlock', (data: { newBlock: IBlock }) => {
      const { newBlock } = data;
      const myBlockchain = reverse(JSON.parse(localStorage.getItem('blockchain') || ''));
      walletApi.validateBlock(newBlock, myBlockchain).then((res: { isValid: boolean }) => {
        const { isValid } = res;
        if (isValid) {
          setBlockchain((prevBlockchain: IBlock[]) => uniqBy([newBlock, ...prevBlockchain], 'index'));
          setTransactions([]);
        }
      });
    });
  }, []);

  useEffect(() => {
    walletApi.getTransactionPool().then((res: { transactionPool: ITransaction[] }) => {
      const { transactionPool } = res;
      setTransactions(reverse(transactionPool));
    });

    walletApi.getBlockchain().then((res: { blockchain: IBlock[] }) => {
      const { blockchain } = res;
      setBlockchain(reverse(blockchain));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('blockchain', JSON.stringify(blockchain));
  }, [blockchain]);

  const handleMine = () => {
    setLoading(true);
    walletApi.mine().then((res: { newBlock: IBlock }) => {
      const { newBlock } = res;
      if (!newBlock) {
        message.error('Failed mine');
      } else {
        setBlockchain((prevBlockChain) => uniqBy([newBlock, ...prevBlockChain], 'index'));
        message.success('Successful mined');
      }
      setTransactions([]);
      setLoading(false);
    });
  };

  const toggleModalTransaction = () => setVisibleModalTransaction(!visibleModalTransaction);

  const handleClickTransaction = (transaction: ITransaction) => {
    setTransactionDetail(transaction);
    toggleModalTransaction();
  };

  const toggleModalBlock = () => setVisibleModalBlock(!visibleModalBlock);

  const handleClickBlock = (blockDetail: IBlock) => {
    setBlockDetail(blockDetail);
    toggleModalBlock();
  };

  return (
    <>
      <Title level={2}>Transaction History</Title>
      <Row>
        <Col span={12} style={{ paddingRight: 10 }}>
          <div className="history-container">
            <div className="history-container__title">
              <Title level={5} style={{ margin: 0 }}>
                Latest Blocks
              </Title>
            </div>
            <div className="history-container__body">
              {blockchain?.map((block: IBlock) => (
                <Row key={block?.index}>
                  <Col span={1}>{block?.index + 1}</Col>
                  <Col span={22}>
                    <div className="word-break-all">{`Miner: ${block?.miner || 'Admin'}`}</div>
                  </Col>
                  <Col span={1}>
                    <a onClick={() => handleClickBlock(block)}>Detail</a>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        </Col>
        <Col span={12} style={{ paddingLeft: 10 }}>
          <div className="history-container">
            <div className="history-container__title">
              <Title level={5} style={{ margin: 0 }}>
                Latest Transactions
              </Title>
            </div>
            <div className="history-container__body">
              {transactions?.map((transaction: ITransaction, index: number) => (
                <Row key={transaction?.id}>
                  <Col span={1}>{transactions.length - index}</Col>
                  <Col span={11} style={{ paddingRight: 5 }}>
                    <a className="word-break-all" onClick={() => handleClickTransaction(transaction)}>{`ID: ${
                      transaction?.id || ''
                    }`}</a>
                  </Col>
                  <Col span={12}>
                    <div className="word-break-all">{`To: ${transaction?.txOuts[0].address}`}</div>
                    <div className="word-break-all">{`Amount: ${transaction?.txOuts[0].amount}`}</div>
                  </Col>
                </Row>
              ))}
            </div>
            <div className="history-container__footer">
              <Button type="primary" onClick={handleMine} loading={loading}>
                Mine
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <ModalTransactionDetail
        visible={visibleModalTransaction}
        toggle={toggleModalTransaction}
        data={transactionDetail}
      />
      <ModalBlockDetail visible={visibleModalBlock} toggle={toggleModalBlock} data={blockDetail} />
    </>
  );
}

export default TransactionHistory;
