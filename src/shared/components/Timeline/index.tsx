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

const TimeLine: React.FC<CustomTimelineProps> = ({ timelineDate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    date: string;
    editable: boolean;
  } | null>(null);

  const [itemStatuses, setItemStatuses] = useState(['completed', 
    'completed',
    'completed', 
    'on-going', 
    'not-started', 
    'not-started', 
  ]);

  const handleEditClick = (item: {
    label: string;
    date: string;
    editable: boolean;
  }) => {
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
      case 'not-started':
        updatedStatuses[index] = 'on-going';
        break;
      case 'on-going':
        updatedStatuses[index] = 'completed';
        break;
      default:
        updatedStatuses[index] = 'not-started';
        break;
    }
    setItemStatuses(updatedStatuses);
  };
  
  return (
    <div>
      <Timeline >
        {itemStatuses.map((status, index) => (
          <div
            key={index}
            className={`timeline-item ${status}`}
            onClick={() => handleItemCompletion(index)}
          >
            <div className="quote-icon-bg">
              {index === 0 ? <QuoteIcon width={10} /> : null}
              {index === 1 ? <QuoteAccepted width={10} /> : null}
              {index === 2 ? <QuoteApproved width={12} /> : null}
              {index === 3 ? <RepairIcon width={12} /> : null}
              {index === 4 ? <RepairApproved width={12} /> : null}
              {index === 5 ? <BilledIcon width={12} /> : null}
            </div>
            <div>
              {index === 0 ? 'Quote Date' : null}
              {index === 1 ? 'Quote Accepted' : null}
              {index === 2 ? 'Quote Approved' : null}
              {index === 3 ? 'Repair Date' : null}
              {index === 4 ? 'Repair Approved' : null}
              {index === 5 ? 'Billed' : null}
            </div>
            {index === 0 || index === 3 ? (
              <div>
                <EditOutlined
                  rev=""
                  onClick={() =>
                    handleEditClick({
                      label: index === 0 ? 'Quote Date' : 'Repair Date',
                      date: timelineDate,
                      editable: true,
                    })
                  }
                />
              </div>
            ) : null}
           {index === 0 || index === 1 || index === 2 ? ( 
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
