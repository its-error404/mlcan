import React, { useEffect, useState } from "react";
import { ReactComponent as QuoteIcon } from "../../../../../assets/single color icons - SVG/quote.svg";
import { ReactComponent as RepairIcon } from "../../../../../assets/single color icons - SVG/repair.svg";
import { ReactComponent as InspectionIcon } from "../../../../../assets/single color icons - SVG/inspection.svg";
import { ReactComponent as DropdownIcon } from "../../../../../assets/single color icons - SVG/accordion closed.svg";
import { ReactComponent as DropDownOpen } from "../../../../../assets/single color icons - SVG/accordion open.svg";
import { ReactComponent as LockIcon } from "../../../../../assets/single color icons - SVG/password.svg";
import { ReactComponent as UpdateIcon } from "../../../../../assets/single color icons - SVG/resize.svg";
import "./ActivityCard.scss";
import "../../../../RepairList/RepairList.scss";
import "./Dropdown.scss";
import { CalendarOutlined } from '@ant-design/icons'
import { Button, Select, Table } from "antd";
import AddItem from "./AddItem";
import OverlayBox from "../../../../../shared/components/overlayBox";
import { ContainerData } from "../../../../../models/singlecontainer.model";
import {deleteItem, fetchActivityStatus, toggleExpandRepairCard, upgradeRepairForm } from "../../../../../services/ContainersService/viewcontainer.service";
import UnlockModal from "../../../../../shared/components/UnlockModal";
import TimeLine from "../../../../../shared/components/Timeline";
import EllipsisMenu from "../../../../../shared/components/EllipsisMenu";
import DeleteModal from "../../../../../shared/components/DeleteModal";
import EditItem from "./EditItem";
import CommentModal from "../../../../../shared/components/CommentModal";
import PhotoModal from "../../../../../shared/components/PhotoModal";
import { getUserInfo } from "../../../../../services/AuthService/authToken";


interface RepairFormData {
  uid: string;
  repairArea: string;
  damageArea: string;
  type: string;
  quantity: string;
  location: string;
  hours: number;
  labourCost: number;
  materialCost: number;
  totalCost: number;
  id: string;
  items: []
}

const ActivityCard: React.FC<{
  UniqueID: string;
  formType: string;
  formID: string;
  date: string;
  activityStatus: string;
  icon: React.ReactElement;
  expanded: boolean;
  toggleExpand?: () => void;
  expandedData?: ContainerData;
}> = ({ UniqueID, formType, formID, date, activityStatus, icon }) => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [addItem, setAddItem] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [updateActivityStatus, setUpdateActivityStatus] = useState("");
  const [expandedRepairFormData, setExpandedRepairFormData] = useState<RepairFormData>();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeline, setTimeline] = useState(false)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [photoModal, setPhotoModal] = useState(false)

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

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
  const [selectedOption, setSelectedOption] = useState("");

  const handleUpdateClick = () => {
    if (activityStatus !== "Select") {
      setSelectedOption(activityStatus);
      setShowConfirmation(true);
    }
  };

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
    {
        title: "Options",
        dataIndex: "options",
        key: "options",
        render: () => (
          <EllipsisMenu
            onDelete={() => {
             setDeleteModalVisible(true)
            }}
            onUpdateComment={() => {
              setCommentModal(true)
            }}
            onUpdatePhoto={() => {
              setPhotoModal(true)
            }}
            onEditItem={()=>{setEditItem(true)}}
          />
        ),
      },
  ];
  const userInfo = getUserInfo()
  const userID = userInfo.uid

  const [activityStatuses, setActivityStatuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitystatues = await fetchActivityStatus();
        setActivityStatuses(activitystatues);
      } catch (err) { }
    };
    fetchData();
  }, []);

  const mapRepairDataToTableData = () => {
    if (expandedRepairFormData) {
      return [
        {
          repairID: expandedRepairFormData.uid,
          repairArea: expandedRepairFormData.repairArea,
          damageArea: expandedRepairFormData.damageArea,
          type: expandedRepairFormData.type,
          quantity: expandedRepairFormData.quantity,
          location: expandedRepairFormData.location,
          hours: expandedRepairFormData.hours,
          labourCost: expandedRepairFormData.labourCost,
          materialCost: expandedRepairFormData.materialCost,
          totalCost: expandedRepairFormData.totalCost,
        },
      ];
    }
    return [];
  };

  const [data, setData] = useState(mapRepairDataToTableData());

  useEffect(() => {
    setData(mapRepairDataToTableData());
  }, [expandedRepairFormData]);
  
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
    toggleExpandRepairCard(UniqueID).then((response) => {
      setExpandedRepairFormData(response);
    });
  };

  const toggleAddItem = () => {
    setAddItem(!addItem);
  };

  const handleConfirm = async (
    id: string,
    option: string,
    uniqueID: string
  ) => {
    try {
      upgradeRepairForm(id, option);
      setShowConfirmation(false);
    } catch (error) {
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div
      className={`activity-card ${formTypeClass} ${isExpanded ? "expanded" : ""
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

        <div
  className={`activity-status ${activityStatus === "draft" ? "draft" : ""}`}
>
  {activityStatus === "draft" ? "Quote Draft" : "Ready for Billing"}
</div>

        <div className="dropdown-icon">
          {isExpanded ? (
            <DropDownOpen width={10} />
          ) : (
            <DropdownIcon width={5} />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="expanded-content">
          <div className="expanded-header">
            <div className="header_first">
              <div className="timeline-button-container">
              <CalendarOutlined rev='' className="calender-icon-timeline"/>
              <Button onClick={()=>setTimeline(!timeline)}>View Timeline</Button>
              {timeline && <TimeLine/>}
              </div>
              <div className="dropdown-user-info">
              <p>Current User</p>
                <p>{userID}{' '}

                  <span
                    className="dropdown-lock-icon"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    &nbsp;
                    <LockIcon width={10} />
                    {showTooltip && <span>Unlock</span>}
                  </span>
                </p>
              </div>
              {showModal && (
                <UnlockModal
                  onCancel={() => setShowModal(false)}
                  onOk={() => setShowModal(false)}
                />
              )}
            </div>
            <div className="header_second">
              <div>
                <Button onClick={() => toggleAddItem()}>Add Item</Button>
              </div>
              <div className="select-container">
                <Button>Status</Button>
                <Select
                  onChange={(value) => setUpdateActivityStatus(value)}
                  value={updateActivityStatus}
                  defaultValue="Select"
                  style={{ width: 150 }}
                  className="activity-select"
                  options={activityStatuses.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                />
                
              </div>
              <Button
                className="submit-button update-submit-button"
                onClick={handleUpdateClick}
              >
                Update
              </Button>
              
            </div>
            
          </div>
          <Table
            columns={[...columns]}
            dataSource={data}
            pagination={false}
            className="activity-item-table"
          />
        </div>
      )}

      {showConfirmation && (
        <OverlayBox minHeight="330px" onClose={() => { }}>
          <div className="overlay-box-update">
            <div className="delete-confirmation-box">
              <div className="delete-text-icon update-text">
                <UpdateIcon className="activity-card-icon" />
                <p>Are you sure to change the status?</p>
                  <p>
                    {formType} - {expandedRepairFormData?.uid} will be moved to{" "}
                    <span className="update-activity-text">
                      {updateActivityStatus}
                    </span>{" "}
                    status
                  </p>
              </div>
              <div className="delete-confirmation-buttons update-status-buttons-container">
                <button onClick={handleCancel}>Cancel</button>
                <button
                  onClick={() =>
                    handleConfirm(
                      expandedRepairFormData?.id || "",
                      updateActivityStatus,
                      expandedRepairFormData?.uid || ""
                    )
                  }
                >
                  Confirm
                </button>
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
                setAddItem(false);
              }}
            />
          </div>
        </div>
      )}

      {isDeleteModalVisible && (<DeleteModal onOk={()=>{deleteItem(expandedRepairFormData?.id || ''); setDeleteModalVisible(false)}} onCancel={()=>setDeleteModalVisible(false)}/>)}
      {editItem && (<div className="overlay"><div className="overlay-content"><EditItem onclose={()=>setEditItem(false)}/></div></div>)}
      {commentModal && (<CommentModal commentData="" id={expandedRepairFormData?.uid} repairArea={expandedRepairFormData?.repairArea}  centered onCancel={()=>{setCommentModal(false)}}/>)}
      {photoModal && (<PhotoModal centered onCancel={()=>{setPhotoModal(false)}} onOk={()=>setPhotoModal(false)} title="" />)}
    </div>
  );
};

export default ActivityCard;
