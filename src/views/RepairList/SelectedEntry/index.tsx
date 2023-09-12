import React from "react";
import "./SelectedEntry.scss";
import "../../RepairList/RepairList.scss";
import { Repair } from "../../../models/repairList.model";
import { ReactComponent as CloseIcon } from "../../../assets/single color icons - SVG/close.svg";

interface SelectedEntryProps {
  selectedEntry: Repair | null;
  overlayOpen: boolean;
  closeOverlay: () => void;
  sectionIndex?: number;
  handleSectionClick?: (index: number) => void;
  setSectionIndex: (index: number) => void;
}

const SelectedEntry: React.FC<SelectedEntryProps> = ({
  selectedEntry,
  closeOverlay,
  sectionIndex,
  handleSectionClick,
  overlayOpen,
}) => {
  if (!selectedEntry) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div
          className={`overlay-box ${overlayOpen ? "overlay-open" : ""}`}
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            position: "fixed",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="entry-header">
            <h3>{selectedEntry.uid} - Top Rails and Headers</h3>
            <CloseIcon
              width={15}
              className="close-icon"
              onClick={() => closeOverlay()}
            />
          </div>
          <div className="overlay-header">
            <span
              className={sectionIndex === 0 ? "column-active" : ""}
              onClick={() => handleSectionClick && handleSectionClick(0)}
            >
              Repair Details
            </span>
            <span
              className={sectionIndex === 1 ? "column-active" : ""}
              onClick={() => handleSectionClick && handleSectionClick(1)}
            >
              Non-Maersk Details
            </span>
            <span
              className={sectionIndex === 2 ? "column-active" : ""}
              onClick={() => handleSectionClick && handleSectionClick(2)}
            >
              Merc+ Details
            </span>
          </div>
          <div className="overlay-content">
            {sectionIndex === 0 && (
              <div className="repair-details">
                <div className="repair-details__headings">
                  <p>Repair ID</p>
                  <p>Container Repair Area</p>
                  <p>Container Damaged Area</p>
                  <p>Repair Type</p>
                </div>
                <div className="repair-details__data">
                  <p>{selectedEntry.uid}</p>
                  <p>{selectedEntry.repArea}</p>
                  <p>{selectedEntry.dmgArea}</p>
                  <p>{selectedEntry.type}</p>
                </div>
              </div>
            )}
            {sectionIndex === 1 && (
              <div className="non-maersk-details">
                <h5>Non-Maersk Cost Details</h5>
                <div className="non-maersk__cost-details">
                  <div className="non-maersk__cost-details-header">
                    <p>Hours</p>
                    <p>Material Cost</p>
                  </div>
                  <div className="non-maersk__cost-details-content">
                    <p>{selectedEntry.nmaersk} sample</p>
                    <p>{selectedEntry.merc?.maxMatCost}</p>
                  </div>
                </div>
                <h5>Non-Maersk Customer Related Details</h5>
                <div className="non-maersk__customer-details">
                  <div className="non-maersk__customer-details-header">
                    <p>Container Section</p>
                    <p>Damaged Area</p>
                    <p>Repair Type</p>
                    <p>Description</p>
                    <p>COMP</p>
                    <p>DAM</p>
                    <p>REP</p>
                    <p>Component</p>
                    <p>Event</p>
                    <p>Location</p>
                    <p>LGTH/QTY/AREA</p>
                    <p>LGTH/QTY/AREA2</p>
                    <p>ID Source</p>
                  </div>
                  <div className="non-maersk__customer-details-content">
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.type}</p>
                    <p>{selectedEntry.merc?.desc}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.repArea}</p>
                    <p>{selectedEntry.merc?.id}</p>
                  </div>
                </div>
              </div>
            )}
            {sectionIndex === 2 && (
              <div className="merc-plus__details">
                <h5>Merc+ Cost Details</h5>
                <div className="merc-plus__cost-details">
                  <div className="merc-plus__cost-details-header">
                    <p>Max Mat. Cost</p>
                    <p>Unit Mat. Cost</p>
                    <p>Hours Per Unit</p>
                    <p>Max Pieces</p>
                    <p>Units</p>
                  </div>
                  <div className="merc-plus__cost-details-content">
                    <p>{selectedEntry.merc?.maxMatCost}</p>
                    <p>sample</p>
                    <p>{selectedEntry.merc?.unitHours}</p>
                    <p>{selectedEntry.merc?.maxPcs}</p>
                    <p>{selectedEntry.merc?.unit}</p>
                  </div>
                </div>
                <h5>Merc+ Customer Related Details</h5>
                <div className="merc-plus-customer__details">
                  <div className="merc-plus-customer__details-header">
                    <p>Repair Mode</p>
                    <p>Mode Number</p>
                    <p>Repair Code</p>
                    <p>Combined</p>
                    <p>Description</p>
                    <p>ID Source</p>
                  </div>
                  <div className="merc-plus-customer__details-content">
                    <p>{selectedEntry.merc?.repMode}</p>
                    <p>{selectedEntry.merc?.modeNum}</p>
                    <p>{selectedEntry.merc?.repCode}</p>
                    <p>{selectedEntry.merc?.combined}</p>
                    <p>{selectedEntry.merc?.desc}</p>
                    <p>{selectedEntry.merc?.id}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedEntry;
