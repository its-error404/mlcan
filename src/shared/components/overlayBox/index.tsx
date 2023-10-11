import React from "react";
import "./overlayBox.scss"; 

interface OverlayBoxProps {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  minWidth?: string; 
  minHeight? : string
}

const OverlayBox: React.FC<OverlayBoxProps> = ({ onClose, children, maxWidth, minHeight, minWidth }) => {
  const overlayStyle = {
    minWidth: minWidth || "400px",
    maxWidth: maxWidth || "533px", 
    minHeight: minHeight || "400px"
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
