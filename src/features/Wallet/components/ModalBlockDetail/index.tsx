import { Button, Modal } from 'antd';
import { IBlock, ITransaction, ITxIn, ITxOut } from 'features/Wallet/pages/TransactionHistory';
import React from 'react';
import './styles.scss';

interface IProps {
  visible: boolean;
  toggle: () => void;
  data: IBlock | undefined;
}

function ModalBlockDetail(props: IProps): JSX.Element {
  const { visible, toggle, data } = props;

  return (
    <Modal
      title="Block Details"
      visible={visible}
      onCancel={toggle}
      footer={[
        <Button key="back" onClick={toggle}>
          Close
        </Button>,
      ]}
      width={800}
    >
      <div className="d-flex">
        <span className="text-bold mr-2">Index:</span>
        <span className="text-overflow">{(data?.index as number) + 1 || ''}</span>
      </div>
      <div className="d-flex">
        <span className="text-bold mr-2">Miner:</span>
        <span className="text-overflow">{data?.miner || 'Admin'}</span>
      </div>
      <div className="d-flex">
        <span className="text-bold mr-2">Timestamp:</span>
        <span className="text-overflow">{data?.timestamp || ''}</span>
      </div>
      <div className="d-flex">
        <span className="text-bold mr-2">Hash:</span>
        <span className="text-overflow">{data?.hash || ''}</span>
      </div>
      <div className="d-flex">
        <span className="text-bold mr-2">Difficulty:</span>
        <span className="text-overflow">{data?.difficulty}</span>
      </div>
      <div className="d-flex">
        <span className="text-bold mr-2">Nonce:</span>
        <span className="text-overflow">{data?.nonce}</span>
      </div>
      <div className="d-flex">
        <span className="text-bold mr-2">PreviousHash:</span>
        <span className="text-overflow">{data?.previousHash || ''}</span>
      </div>
      <div className="d-flex flex-column">
        <span className="text-bold mr-2">Transactions:</span>
        {data?.data?.map((transaction: ITransaction, index: number) => (
          <div className="d-flex" key={index}>
            <span style={{ color: 'red', fontWeight: 'bold' }}>{`${index + 1}.`}</span>
            <div className="d-flex flex-column ml-2" style={{ width: 'calc(100% - 20px)' }}>
              <div className="d-flex">
                <span className="text-bold mr-2">ID:</span>
                <span className="text-overflow">{transaction?.id || ''}</span>
              </div>
              <div className="text-bold mr-2">TxIns:</div>
              {transaction?.txIns?.map((txIn: ITxIn, index: number) => (
                <div key={index}>
                  <div className="d-flex">
                    <span>{`${index + 1}.`}</span>
                    <div className="d-flex flex-column w-100 ml-2">
                      <span className="text-overflow">{`TxOutId: ${txIn?.txOutId}`}</span>
                      <span className="text-overflow">{`TxOutIndex: ${txIn?.txOutIndex}`}</span>
                      <span className="text-overflow">{`Signature: ${txIn?.signature}`}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-bold mr-2">TxOuts:</div>
              {transaction?.txOuts?.map((txOut: ITxOut, index: number) => (
                <div key={index}>
                  <div className="d-flex">
                    <span>{`${index + 1}.`}</span>
                    <div className="d-flex flex-column w-100 ml-2">
                      <span className="text-overflow">{`Address: ${txOut?.address}`}</span>
                      <span className="text-overflow">{`Amount: ${txOut?.amount}`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ModalBlockDetail;
