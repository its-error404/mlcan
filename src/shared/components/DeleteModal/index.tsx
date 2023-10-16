import { Modal } from 'antd'
import React from 'react'
import './DeleteModal.scss'
import { ReactComponent as DeleteIcon } from "../../../assets/Multicolor icons - SVG/Trash-Recycle Bin-Delete-User Interface-Remove.svg"

type ModalProps = {
    children?: React.ReactNode;
    title?: string;
    centered?: boolean;
    visible?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
  }

const DeleteModal:React.FC<ModalProps> = ({onCancel, onOk}) => {
  return (
    <div>
      <Modal
        centered
        open
        onCancel={onCancel}
        onOk={onOk}
        className='delete-modal'
        cancelText='Cancel'
        okText='Delete'
      >
        <div className='text-container delete-modal-text'>
        <DeleteIcon/>
        <p>Are you sure to delete the item ?</p>
        <p>You can't undo this action</p>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal

