import React from 'react'
import {ReactComponent as UpdateIcon } from '../../../assets/single color icons - SVG/resize.svg'

interface ApproveBoxProps {
    onclose: () => void
}

const ApproveBox:React.FC<ApproveBoxProps> = ({onclose}) => {
  return (
    <div>
       <div className="delete-confirmation-box">
              <div className="delete-text-icon">
                <UpdateIcon/>
                {/* <p>Are you sure to change the status?</p>
                {expandedRepairFormData.uid &&
                <p>{formType} - {expandedRepairFormData.uid} will be moved to <span className="update-activity-text">{updateActivityStatus}</span> status</p>} */}
              </div>
              <div className="delete-confirmation-buttons update-status-buttons-container">
              <button onClick={onclose}>Cancel</button>
              {/* <button onClick={()=>handleConfirm(expandedRepairFormData.id, updateActivityStatus, expandedRepairFormData.uid)}>Confirm</button> */}
              </div>
            </div>
    </div>
  )
}

export default ApproveBox
