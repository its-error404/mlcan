import { Modal } from 'antd'
import React from 'react'
import './UnlockModal.scss'
import { getUserInfo } from '../../../services/AuthService/authToken'
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
  const userInfo = getUserInfo()
  const userID = userInfo.uid

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
        <p>Changes made by {userID} will be discarded</p>
        </div>
      </Modal>
    </div>
  )
}

export default UnlockModal

