import React from "react";
import './activity.scss'
import { ReactComponent as QuoteIcon } from '../../../../assets/single color icons - SVG/quote.svg';
import { ReactComponent as RepairIcon } from '../../../../assets/single color icons - SVG/repair.svg'
import { ReactComponent as InspectionIcon } from '../../../../assets/single color icons - SVG/inspection.svg'

const ActivitySection: React.FC = () => {
  return (
    <div className="activity-section">
      <div className="horizontal-card">
        <div className="icon-border">
          <QuoteIcon width={20} className="quote-icon"/>
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
