import React, { useState } from "react";
import { ReactComponent as ExportIcon } from "../../../assets/single color icons - SVG/export.svg"

const ExportMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="export-container" onClick={toggleMenu}>
      <button className="export-button">
        <span className="export-icon">
          <ExportIcon width={20} />
        </span>
        Export
      </button>
      <div className={`export-menu-box ${isOpen ? "visible" : "invisible"}`}>
        <div>
          <p>Export as .csv</p>
        </div>
        <div>
          <p>Export as .xlsv</p>
        </div>
      </div>
    </div>
  );
};

export default ExportMenu;
