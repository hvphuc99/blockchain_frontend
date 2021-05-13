import { Button, Modal } from 'antd';
import { ITransaction, ITxIn, ITxOut } from 'features/Wallet/pages/TransactionHistory';
import React from 'react';
import './styles.scss';

interface IProps {
  visible: boolean;
  toggle: () => void;
  data: ITransaction | undefined;
}

function ModalTransactionDetail(props: IProps): JSX.Element {
  const { visible, toggle, data } = props;

  return (
    <Modal
      title="Transaction Details"
      visible={visible}
      onCancel={toggle}
      footer={[
        <Button key="back" onClick={toggle}>
          Close
        </Button>,
      ]}
      width={600}
    >
      <div className="d-flex">
        <span className="text-bold mr-2">ID:</span>
        <span className="text-overflow">{data?.id || ''}</span>
      </div>
      <div className="text-bold mr-2">TxIns:</div>
      {data?.txIns?.map((txIn: ITxIn, index: number) => (
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
      {data?.txOuts?.map((txOut: ITxOut, index: number) => (
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
    </Modal>
  );
}

export default ModalTransactionDetail;
