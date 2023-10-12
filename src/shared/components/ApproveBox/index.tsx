import React from 'react'
import './ApproveBox.scss'
import {ReactComponent as UpdateIcon } from '../../../assets/single color icons - SVG/resize.svg'

interface ApproveBoxProps {
    onclose: () => void
}

const ApproveBox:React.FC<ApproveBoxProps> = ({onclose}) => {
  return (
    <div>
       <div className="delete-confirmation-box">
              <div className="delete-text-icon">
                <UpdateIcon className='update-icon-approve-box'/>
               <p>Are you sure to approve all the quotes?</p>
               <p>Selected quotes will be moved to quote approved status</p>
              </div>
              <div className="delete-confirmation-buttons update-status-buttons-container approve-buttons">
              <button onClick={onclose}>Cancel</button>
              <button onClick={onclose}>Confirm</button>
              </div>
            </div>
    </div>
  )
}

export default ApproveBox
