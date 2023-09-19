import React from "react";
import { ReactComponent as QuoteIcon } from "../../../../../assets/single color icons - SVG/quote.svg";
import { ReactComponent as RepairIcon } from "../../../../../assets/single color icons - SVG/repair.svg";
import { ReactComponent as InspectionIcon } from "../../../../../assets/single color icons - SVG/inspection.svg";
import { Dropdown, Menu } from "antd";
import { ReactComponent as DropdownIcon } from "../../../../../assets/single color icons - SVG/accordion closed.svg";
import "./ActivityCard.scss";

const ActivityCard: React.FC<{
  formType: string;
  formID: string;
  date: string;
  activityStatus: string;
  icon: React.ReactElement;
  expanded: boolean;
  toggleExpand: () => void;
}> = ({
  formType,
  formID,
  date,
  activityStatus,
  icon,
  expanded,
  toggleExpand,
}) => {
  const getBackgroundColor = () => {
    if (icon.type === QuoteIcon) {
      return "lightpurple";
    } else if (icon.type === RepairIcon) {
      return "lightyellow";
    } else if (icon.type === InspectionIcon) {
      return "lightblue";
    } else {
      return "";
    }
  };

  const formTypeClass =
    formType === "Quote Form"
      ? "form-type-quote"
      : formType === "Repair Form"
      ? "form-type-repair"
      : formType === "Inspection Form"
      ? "form-type-inspection"
      : "";

  return (
    <div className={`activity-card ${formTypeClass} ${expanded ? "expanded" : ""}`}>
      <div className="card-header">
        <div className="details-flex">
          <div className={`icon-background ${getBackgroundColor()}`}>
            <div className="card-icon">{icon} </div>
          </div>
          <div className="card-details">
              <div className="form-type">{formType}</div>
              <div className="form-id">{formID}</div>
          </div>
          <div className="date">{date}</div>
        </div>

        <div className={`activity-status ${activityStatus === "draft" ? "draft" : ""}`}>{activityStatus}</div>
        <div className="dropdown-icon" onClick={(e) => e.preventDefault()}>
          {<DropdownIcon width={10} />}
        </div>
      </div>
      {expanded && <div className="expanded-content"></div>}
    </div>
  );
};

export default ActivityCard;
