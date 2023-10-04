import React, { useEffect, useState } from "react";
import { ReactComponent as QuoteIcon } from "../../../../../assets/single color icons - SVG/quote.svg";
import { ReactComponent as RepairIcon } from "../../../../../assets/single color icons - SVG/repair.svg";
import { ReactComponent as InspectionIcon } from "../../../../../assets/single color icons - SVG/inspection.svg";
import { ReactComponent as DropdownIcon } from "../../../../../assets/single color icons - SVG/accordion closed.svg";
import { ReactComponent as DropDownOpen } from "../../../../../assets/single color icons - SVG/accordion open.svg";
import { ReactComponent as LockIcon } from '../../../../../assets/single color icons - SVG/password.svg'
import "antd/dist/antd.css";
import "./ActivityCard.scss";
import "../../../../RepairList/RepairList.scss";
import './Dropdown.scss'
import { Button, Dropdown, Menu, Select, Table } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const ActivityCard: React.FC<{
  UniqueID: string
  formType: string;
  formID: string;
  date: string;
  activityStatus: string;
  icon: React.ReactElement;
  expanded: boolean;
  toggleExpand: () => void;
  expandedData
}> = ({
  UniqueID,
  formType,
  formID,
  date,
  activityStatus,
  icon,
  expanded,
  toggleExpand,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedRepairFormData, setExpandedRepairFormData] = useState(null)
  const [expandedQuoteFormData, setExpandedQuoteFormData] = useState(null)
  const [addItem, setAddItem] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [updateActivityStatus, setUpdateActivityStatus] = useState("");

  const getBackgroundColor = () => {
    switch (icon.type) {
      case QuoteIcon:
        return "lightpurple";
      case RepairIcon:
        return "lightyellow";
      case InspectionIcon:
        return "lightblue";
      default:
        return "red";
    }
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleUpdateClick = () => {
    if (activityStatus !== "Select") {
      setSelectedOption(activityStatus); 
      setShowConfirmation(true);
    }
  }

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
  ]

  const mapRepairDataToTableData = () => {
    if (expandedRepairFormData) {
      return [
        {
          repairID: expandedRepairFormData.uid || 'RF00001',
          repairArea: expandedRepairFormData.repairArea || 'Top Rails and Headers',
          damageArea: expandedRepairFormData.damageArea || 'Top Longitudinal Rails',
          type: expandedRepairFormData.type || 'Replace',
          quantity: expandedRepairFormData.quantity || '3',
          location: expandedRepairFormData.location || 'LXXX',
          hours: expandedRepairFormData.hours || 1.2,
          labourCost: expandedRepairFormData.labourCost || 71.5,
          materialCost: expandedRepairFormData.materialCost || 71.5,
          totalCost: expandedRepairFormData.totalCost || 71.5,
        },
      ];
    }
    return [];
  };

const [data, setData] = useState(mapRepairDataToTableData());

useEffect(() => {
  setData(mapRepairDataToTableData());
}, [expandedRepairFormData]);



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
          <EllipsisOutlined rev={''}/>
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

      const toggleExpandRepairCard = async (uniqueID: string) => {
        try {
          const response = await axiosInstance.get(`${ApiRoutes.REPAIR_FORM}/${UniqueID}`);
          setExpandedRepairFormData(response.data);
          setData(mapRepairDataToTableData());
        } catch (error) {
          console.error("Error fetching card details:", error);
        }
      };

  const toggleExpandCard = () => {
    setIsExpanded(!isExpanded);
    toggleExpandRepairCard(UniqueID)
  };

  const toggleAddItem = () => {
    setAddItem(!addItem);
  };

  const handleConfirm = async () => {
    try {
      const response = await axiosInstance.post(`${ApiRoutes.REPAIR_FORM}/upgrade/${UniqueID}`, {
        option: selectedOption,
      });
      notification.success({
        message: "updated Successfully !",
        className: "custom-notification-placement",
      });
      console.log(response);   
      setShowConfirmation(false);
    } catch (error) {
      setShowConfirmation(false);
      notification.error({
        message: "update failed !",
        className: "custom-notification-placement",
      });
      console.error("Error updating status:", error);
    
    }
  };
  
  const handleCancel = () => {
    setShowConfirmation(false);
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
              <div><Button onClick={()=>toggleAddItem()}>Add Item</Button></div>
              <div className="select-container">
                <Button>Status</Button>
                <Select
                 onChange={(value) => setUpdateActivityStatus(value)}
                  value={updateActivityStatus}
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
              <Button onClick={handleUpdateClick}>Update</Button>
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

      {showConfirmation && (
  <OverlayBox maxWidth="400px" minHeight="200px" onClose={()=> {}}>
    <div>
     
      <div className="delete-confirmation-box">
              <div className="delete-text-icon">
                <p>Are you sure you want to update the status?</p>
              </div>
              <div className="delete-confirmation-buttons">
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
    
    </div>
  </OverlayBox>
)}

          {addItem && (
            <div className="overlay">
              <div className="overlay-content">
                <AddItem
                  onclose={() => {
                    setAddItem
                    (false);
                  }}
                />
              </div>
            </div>
          )}
    </div>
  );
};

export default ActivityCard;
