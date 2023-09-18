import React from "react";
import "./overlayBox.scss"; 

interface OverlayBoxProps {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string; 
}

const OverlayBox: React.FC<OverlayBoxProps> = ({ onClose, children, maxWidth }) => {
  const overlayStyle = {
    maxWidth: maxWidth || "400px", 
  };

  return (
    <div className="overlay">
    <div className="overlay-box" style={overlayStyle}>
      <div className="overlay-box-content">
        {children}
      </div>
    </div>
    </div>
  );
};

export default OverlayBox;
