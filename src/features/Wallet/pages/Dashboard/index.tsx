import { AuditOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Col, Row, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import walletApi from 'api/walletApi';
import { RootState } from 'app/store';
import 'features/Wallet/pages/Dashboard/styles.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ITransaction, ITxOut } from 'features/Wallet/pages/TransactionHistory';
import ModalTransactionDetail from 'features/Wallet/components/ModalTransactionDetail';

function Dashboard(): JSX.Element {
  const { publicKey } = useSelector((state: RootState) => state.user);
  const [balance, setBalance] = useState<number>(0);
  const [myTransactions, setMyTransactions] = useState<ITransaction[]>([]);
  const [visibleModalTransaction, setVisibleModalTransaction] = useState<boolean>(false);
  const [transactionDetail, setTransactionDetail] = useState<ITransaction>();

  useEffect(() => {
    walletApi.getBalance().then((res: { balance: number }) => {
      setBalance(res?.balance || 0);
    });
    walletApi.getMyTransaction().then((res: { transactions: ITransaction[] }) => {
      const { transactions } = res;
      setMyTransactions(transactions);
    });
  }, []);

  const toggleModalTransaction = () => setVisibleModalTransaction(!visibleModalTransaction);

  const handleClickTransaction = (transaction: ITransaction) => {
    setTransactionDetail(transaction);
    toggleModalTransaction();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // eslint-disable-next-line react/display-name
      render: (value: string, record: ITransaction) => <a onClick={() => handleClickTransaction(record)}>{value}</a>,
    },
    {
      title: 'To',
      dataIndex: 'txOuts',
      // eslint-disable-next-line react/display-name
      render: (value: ITxOut[]) => <span style={{ overflow: 'hidden' }}>{value[0].address}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'txOuts',
      // eslint-disable-next-line react/display-name
      render: (value: ITxOut[]) => <span>{value[0].amount}</span>,
      width: 100,
    },
    {
      title: '',
      // eslint-disable-next-line react/display-name
      render: (record: ITransaction) => <a onClick={() => handleClickTransaction(record)}>Detail</a>,
      width: 100,
    },
  ];

  return (
    <>
      <Title level={2}>Dashboard</Title>
      <Row>
        <Col span={12} className="col-dashboard__left">
          <div className="card-dashboard" style={{ backgroundColor: '#7070E3' }}>
            <AuditOutlined style={{ fontSize: 40, color: 'white' }} />
            <div className="card-dashboard__content">
              <Title level={4}>Address</Title>
              <span>{publicKey}</span>
            </div>
          </div>
        </Col>
        <Col span={12} className="col-dashboard__right">
          <div className="card-dashboard" style={{ backgroundColor: '#25B0E8' }}>
            <CreditCardOutlined style={{ fontSize: 40, color: 'white' }} />
            <div className="card-dashboard__content">
              <Title level={4} style={{ margin: 0 }}>
                Balance
              </Title>
              <span style={{ fontSize: 40 }}>{balance}</span>
            </div>
          </div>
        </Col>
      </Row>
      <Title className="mt-4" level={5}>
        My transactions
      </Title>
      <Table className="mt-2" rowKey="id" columns={columns} dataSource={myTransactions} scroll={{ x: 500, y: 400 }} />
      <ModalTransactionDetail
        visible={visibleModalTransaction}
        toggle={toggleModalTransaction}
        data={transactionDetail}
      />
    </>
  );
}

export default Dashboard;
