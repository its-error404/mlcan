import { Modal } from 'antd'
import React, { useState } from 'react'
import './UnlockModal.scss'
import {ReactComponent as LockIcon} from '../../../assets/single color icons - SVG/lock.svg'


type ModalProps = {
    children?: React.ReactNode;
    title?: string;
    centered?: boolean;
    visible?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
  }

const UnlockModal:React.FC<ModalProps> = ({onCancel, onOk}) => {
  return (
    <div>
      <Modal
        centered
        open
        onCancel={onCancel}
        onOk={onOk}
        className='unlock-modal'
        cancelText='Cancel'
        okText='Unlock User'
      >
        <div className='text-container'>
        <LockIcon/>
        <p>Are you sure to unlock the user?</p>
        <p>Changes made by James will be discarded</p>
        </div>
      </Modal>
    </div>
  )
}

export default UnlockModal

