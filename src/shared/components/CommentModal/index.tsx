import { Modal } from 'antd'
import React from 'react'
import './CommentModal.scss'
import { ReactComponent as DeleteIcon } from "../../../assets/Multicolor icons - SVG/Trash-Recycle Bin-Delete-User Interface-Remove.svg"
import CustomInput from '../InputField'

type CommentModalProps = {
    children?: React.ReactNode;
    title?: string;
    id?: string;
    repairArea?: string;
    commentData?: string
    centered?: boolean;
    visible?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
  }

const CommentModal:React.FC<CommentModalProps> = ({onCancel, onOk, id, commentData, repairArea}) => {
  return (
    <div>
      <Modal
        centered
        open
        onCancel={onCancel}
        onOk={onOk}
        className='comment-modal'
        cancelText='Discard'
        okText='Update'
      >
        <div className='text-container comment-modal-text'>
        <p>RID002 - Top Rails and Headers</p>
        </div>
        <CustomInput id='comments' label='Comments' name='comments' value=''/>
      </Modal>
    </div>
  )
}

export default CommentModal

