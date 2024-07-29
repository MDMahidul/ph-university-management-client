import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";

type TModalPorps = {
  title: string;
  mText: string;
  onConfirm: () => void;
  status?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  tooltipText?: string;
};

const DeleteModal = ({
  title,
  mText,
  onConfirm,
  status,
  disabled,
  icon,
  tooltipText,
}: TModalPorps) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(mText);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("Processing...");
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
      <Tooltip title={tooltipText}>
        <Button onClick={showModal} disabled={disabled} icon={icon}>
          {status}
        </Button>
      </Tooltip>
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
