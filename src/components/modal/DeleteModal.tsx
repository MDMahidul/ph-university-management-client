import { useState } from "react";
import { Button, Modal } from "antd";

type TModalPorps = {
  title: string;
  mText: string;
  onConfirm: () => void;
  status: string;
  disabled: boolean;
};

const DeleteModal = ({
  title,
  mText,
  onConfirm,
  status,
  disabled,
}: TModalPorps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(mText);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("Blocking...");
    setConfirmLoading(true);
    onConfirm();
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} disabled={disabled}>
        {status}
      </Button>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
