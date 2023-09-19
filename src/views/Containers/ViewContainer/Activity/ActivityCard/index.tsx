import React, { useState } from "react";
import { ReactComponent as QuoteIcon } from "../../../../../assets/single color icons - SVG/quote.svg";
import { ReactComponent as RepairIcon } from "../../../../../assets/single color icons - SVG/repair.svg";
import { ReactComponent as InspectionIcon } from "../../../../../assets/single color icons - SVG/inspection.svg";
import { ReactComponent as DropdownIcon } from "../../../../../assets/single color icons - SVG/accordion closed.svg";
import { ReactComponent as DropDownOpen } from "../../../../../assets/single color icons - SVG/accordion open.svg";
import { ReactComponent as LockIcon } from '../../../../../assets/single color icons - SVG/password.svg'
import "antd/dist/antd.css";
import "./ActivityCard.scss";
import './Dropdown.scss'
import { Button, Dropdown, Menu, Select, Table } from "antd";

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
  const [isExpanded, setIsExpanded] = useState(false);

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

  const { Option } = Select;

const columns = [
  {
    title: "Repair ID",
    dataIndex: "repairID",
    key: "repairID",
  },
  {
    title: "Repair Area",
    dataIndex: "repairArea",
    key: "repairArea",
  },
  {
    title: "Damage Area",
    dataIndex: "damageArea",
    key: "damageArea",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Hours",
    dataIndex: "hours",
    key: "hours",
  },
  {
    title: "Labour Cost",
    dataIndex: "labourCost",
    key: "labourCost",
  },
  {
    title: "Material Cost",
    dataIndex: "materialCost",
    key: "materialCost",
  },
  {
    title: "Total Cost",
    dataIndex: "totalCost",
    key: "totalCost",
  },
];

const data = [
  {
    repairID: "001",
    repairArea: "Top Rails and Headers",
    damageArea: "Top Longitudinal Rails",
    type: "Replace",
    quantity: '3',
    location: "LXXX",
    hours: 1.2,
    labourCost: 71.5,
    materialCost: 71.5,
    totalCost: 71.5,
  },
];

const OptionMenu = ({ onDelete, onUpdateComment, onUpdatePhoto }) => {
    const menu = (
      <Menu>
        <Menu.Item key="updateComment" onClick={onUpdateComment}>
          Update Comment
        </Menu.Item>
        <Menu.Item key="updatePhoto" onClick={onUpdatePhoto}>
          Update Photo
        </Menu.Item>
        <Menu.Item key="delete" onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="option-menu">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </Dropdown>
      );
    };

  const formTypeClass =
    formType === "Quote Form"
      ? "form-type-quote"
      : formType === "Repair Form"
      ? "form-type-repair"
      : formType === "Inspection Form"
      ? "form-type-inspection"
      : "";

  const toggleExpandCard = () => {
    setIsExpanded(!isExpanded);
  };



  return (
    <div
      className={`activity-card ${formTypeClass} ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <div
        className={`card-header ${isExpanded ? "expanded-header" : ""}`}
        onClick={toggleExpandCard}
      >
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

        <div className={`activity-status ${activityStatus === "draft" ? "draft" : ""}`}> {activityStatus === "repair" ? "repair" : activityStatus}</div>
        <div className="dropdown-icon">
          {isExpanded ? (
            <DropDownOpen width={10} />
          ) : (
            <DropdownIcon width={10} />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="expanded-content">
          <div className="expanded-header">
            <div className="header_first">
              <div>
                <Button>View Timeline</Button>
              </div>
              <div className="dropdown-user-info">
                <p>Current User</p>
                <p>James Vasanth <span className="dropdown-lock-icon">&nbsp;<LockIcon width={10}/></span></p>
              </div>
            </div>
            <div className="header_second">
              <div><Button>Add Item</Button></div>
              <div className="select-container">
                <Button>Status</Button>
                <Select
                  value={activityStatus}
                  defaultValue="Select"
                  style={{ width: 150 }}
                  dropdownMatchSelectWidth={false}
                  placement={"bottomLeft"}
                  className="activity-select"
                  options={[
                    {
                      value: "Quote Draft",
                      label: "Quote Draft",
                    },
                    {
                      value: "Quote Pending",
                      label: "Quote Pending ",
                    },
                    {
                      value: "Quote Issued",
                      label: "Quote Issued",
                    },
                    {
                      value: "Quote Approved",
                      label: "Quote Approved",
                    },
                    {
                      value: "Repair Done",
                      label: "Repair Done",
                    },
                  ]}
                />
              </div>
              <div><Button>Update</Button></div>
            </div>
            </div>
            <Table
            columns={[
              ...columns,
              {
                key: "options",
                render: (text, record, index) => (
                  <OptionMenu
                    onDelete={() => console.log('delete')}
                    onUpdateComment={() => console.log('update')}
                    onUpdatePhoto={() => console.log('comment')}
                  />
                ),
              },
            ]}
            dataSource={data}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
