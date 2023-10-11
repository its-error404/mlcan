import React, { useState } from "react";
import { Timeline, Modal, DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./Timeline.scss";
import { ReactComponent as QuoteIcon } from "../../../assets/single color icons - SVG/quote.svg";
import { ReactComponent as QuoteAccepted } from "../../../assets/single color icons - SVG/quote accepted.svg";
import { ReactComponent as QuoteApproved } from "../../../assets/single color icons - SVG/quote approved.svg";
import { ReactComponent as RepairIcon } from "../../../assets/single color icons - SVG/repair.svg";
import { ReactComponent as RepairApproved } from "../../../assets/single color icons - SVG/repair approved.svg";
import { ReactComponent as BilledIcon } from "../../../assets/single color icons - SVG/invoice.svg";

interface CustomTimelineProps {
  timelineDate: string;
}

interface TimelineItem {
  icon: JSX.Element;
  label: string;
  editable: boolean;
}

const timelineItems: TimelineItem[] = [
  {
    icon: <QuoteIcon width={10} />,
    label: "Quote Date",
    editable: true,
  },
  {
    icon: <QuoteAccepted width={10} />,
    label: "Quote Accepted",
    editable: false,
  },
  {
    icon: <QuoteApproved width={12} />,
    label: "Quote Approved",
    editable: false,
  },
  {
    icon: <RepairIcon width={12} />,
    label: "Repair Date",
    editable: true,
  },
  {
    icon: <RepairApproved width={12} />,
    label: "Repair Approved",
    editable: false,
  },
  {
    icon: <BilledIcon width={12} />,
    label: "Billed",
    editable: false,
  },
];

const TimeLine: React.FC<CustomTimelineProps> = ({ timelineDate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  const [itemStatuses, setItemStatuses] = useState(["completed", "completed", "completed", "on-going", "not-started", "not-started"]);

  const handleEditClick = (item: TimelineItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleItemCompletion = (index: number) => {
    const updatedStatuses = [...itemStatuses];
    switch (updatedStatuses[index]) {
      case "not-started":
        updatedStatuses[index] = "on-going";
        break;
      case "on-going":
        updatedStatuses[index] = "completed";
        break;
      default:
        updatedStatuses[index] = "not-started";
        break;
    }
    setItemStatuses(updatedStatuses);
  };

  return (
    <div>
      <Timeline>
        {itemStatuses.map((status, index) => (
          <div
            key={index}
            className={`timeline-item ${status}`}
            onClick={() => handleItemCompletion(index)}
          >
            <div className="quote-icon-bg">
              {timelineItems[index].icon}
            </div>
            <div>{timelineItems[index].label}</div>
            {timelineItems[index].editable ? (
              <div>
                <EditOutlined
                  rev=""
                  onClick={() => handleEditClick(timelineItems[index])}
                />
              </div>
            ) : null}
            {index >= 0 && index <= 2 ? (
              <div>{timelineDate}</div>
            ) : null}
          </div>
        ))}
      </Timeline>
      <Modal
        className="date-modal"
        title={`Edit ${selectedItem?.label}`}
        open={modalVisible}
        onOk={handleModalOk}
        okText="Update"
        onCancel={handleModalCancel}
      >
        <label>{selectedItem?.label}</label>
        <DatePicker className="timeline-datepicker" placeholder="Enter" />
      </Modal>
    </div>
  );
};

export default TimeLine;
