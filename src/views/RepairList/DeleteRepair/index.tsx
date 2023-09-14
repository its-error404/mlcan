import React from "react";

interface DeleteConfirmationOverlayProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationOverlay: React.FC<DeleteConfirmationOverlayProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={`overlay ${deleteConfirmationVisible ? "overlay-open" : ""}`}>
      {/* ... rest of your overlay code ... */}
    <div className={`overlay ${isVisible ? "overlay-open" : ""}`}>
      <div className="overlay-content">
        <div className="overlay-box">
          <p>Are you sure you want to delete this entry?</p>
          <div className="overlay-buttons">
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DeleteConfirmationOverlay;
