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
import dayjs, { Dayjs } from "dayjs";
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

const TimeLine = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [selectedQuoteDate, setSelectedQuoteDate] = useState('');
  const [selectedRepairDate, setSelectedRepairDate] = useState('');
  const [itemStatuses, setItemStatuses] = useState(["completed", "completed", "completed", "on-going", "not-started", "not-started"]);
  const [displayDate, setDisplayDate] = useState(false)

  const handleQuoteDateChange = (date: Dayjs | null) => {
    if (date !== null) {
      if (setSelectedQuoteDate) {
        setSelectedQuoteDate(date.format('DD MMM YYYY'));
      }
    } else {
      if (setSelectedQuoteDate) {
        setSelectedQuoteDate('');
      }
    }
  };

  const handleRepairDateChange = (date: Dayjs | null) => {
    if (date !== null) {
      if (setSelectedRepairDate) {
        setSelectedRepairDate(date.format('DD MMM YYYY'))
      }
    } else {
      if (setSelectedRepairDate) {
        setSelectedRepairDate('')
      }
    }
  }

  const handleEditClick = (item: TimelineItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleModalOk = () => {
    if (selectedItem?.label === "Quote Date") {
      setSelectedQuoteDate(selectedQuoteDate); 
    } else if (selectedItem?.label === "Repair Date") {
      setSelectedRepairDate(selectedRepairDate);
    }
    setModalVisible(false);
    setDisplayDate(true)
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
          >
            <div className="quote-icon-bg">
              {timelineItems[index].icon}
            </div>
            <div>{timelineItems[index].label}</div>
            {timelineItems[index].editable ? (
              <div>
                <EditOutlined
                  onClick={() => handleEditClick(timelineItems[index])}
                />
              </div>
            ) : null
            }
            {displayDate && timelineItems[index].label === "Quote Date" &&(
              <div>{selectedQuoteDate}</div>
            )}
            {displayDate && timelineItems[index].label === "Repair Date" && (
              <div>{selectedRepairDate}</div>
            )}
          </div>
        ))}
      </Timeline>
      {selectedItem?.label === "Quote Date" && (
        <Modal
          className="date-modal"
          title={`Edit Quote Date`}
          open={modalVisible}
          onOk={handleModalOk}
          okText="Update"
          onCancel={handleModalCancel}
        >
          <label>Quote Date</label>
          <DatePicker
            className="timeline-datepicker"
            value={selectedRepairDate !== "" ? dayjs(selectedRepairDate, "DD MMM YYYY") : null}
            onChange={handleQuoteDateChange}
            placeholder="Enter Quote Date"
          />
        </Modal>
      )}

      {selectedItem?.label === "Repair Date" && (
        <Modal
          className="date-modal"
          title={`Edit Repair Date`}
          open={modalVisible}
          onOk={handleModalOk}
          okText="Update"
          onCancel={handleModalCancel}
        >
          <label>Repair Date</label>
          <DatePicker
            className="timeline-datepicker"
            value={selectedRepairDate !== "" ? dayjs(selectedRepairDate, "DD MMM YYYY") : null}
            onChange={handleRepairDateChange}
            placeholder="Enter Repair Date"
          />
        </Modal>
      )}

    </div>
  );
};

export default TimeLine