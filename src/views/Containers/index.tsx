import React, { useState } from "react";
import "./Containers.scss";
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import { ReactComponent as SearchIcon } from "../../assets/single color icons - SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/single color icons - SVG/filter.svg";
import { ReactComponent as ToggleIcon } from "../../assets/Multicolor icons - SVG/sort default.svg";
import { ReactComponent as AscToggleIcon } from "../../assets/Multicolor icons - SVG/sort asc.svg";
import { Button, Table } from "antd";
import {
  useFetchData,
} from "../../services/ContainersService/containers.service";
import AddContainer from "./AddContainer";
import { format } from "date-fns";
import { Link, Navigate } from "react-router-dom";
import { useRowClick } from "../../shared/hooks/useRowClick";
import '../../styles/_@antOverrides.scss'

const AllContainers = () => {
  const [searchData, setSearchData] = useState("");
  const { containersData } = useFetchData(searchData);
  const { selectedEntry, handleRowClick } = useRowClick();
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const [addContainer, setAddContainer] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState("All")
  const [filterMenu, setFilterMenu] = useState<boolean>(false);

  const toggleFilterMenu = () => {
    setFilterMenu(!filterMenu);
  };


  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  const toggleAddContainer = () => {
    setAddContainer(!addContainer);
  };

  const closeAddContainer = () => {
    setAddContainer(false);
  };

  const openOverlay = () => {
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  const filterContainers = (section: string) => {
    
    if (!containersData?.data?.docs) {
      return [];
    }
  
    if (section === "All") {
      return containersData.data.docs;
    } else if (section === "Draft") {
      return containersData.data.docs.filter((docs) => {
        return docs.activityStatus === "draft"
      })
    } else if (section === "Admin Review Pending") {
      return containersData.data.docs.filter((docs) => {
        return docs.activityStatus === "billing"
      })
    } else if (section === "Pending Customer Approval") {
      return containersData.data.docs.filter((docs) => {
        return docs.activityStatus === "pending"
      })
  } else if (section === "Quotes Approved by Customer") {
      return containersData.data.docs.filter((docs) => {
        return docs.activityStatus === "approved"
      })
  }
}

  const handleSectionClick = (section: string) => {
    const newIndex = sections.indexOf(section);
    setSectionIndex(newIndex);
    setActiveSection(section);
  }

  const sections = ["All", "Draft", "Admin Review Pending", "Pending Customer Approval", "Quotes Approved by Customers"];
  const columns = [
    {
      title: "Container Number",
      dataIndex: "uid",
      key: "uid",
      render: (text:string, record:any) => <Link to={`/containers/${record.uid}`}>{text}</Link>,
    },
    {
      title: "Yard",
      dataIndex: "yard",
      key: "yard",
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (text:string, record:any) => text || "N/A",
    },
    {
      title: "Owner Name",
      dataIndex: "owner",
      key: "owner",
      render: (text:string, record:any) => text || "N/A",
    },
    {
      title: sectionIndex === 1 ? "Activity" : "Current Activity",
      dataIndex: "activity_type",
      key: "activity_type",
      render: (text:string, record:any) => text || "N/A",
    },
    {
      title: sectionIndex === 1 ? "Activity ID" : "Current Activity",
      dataIndex: "activity_uid",
      key: "activity_uid",
      render: (text:string, record:any) => text || "N/A",
    },
    {
      title: "Activity Date",
      dataIndex: "activity_date",
      key: "activity_date",
      render: (text:string, record:any) => formatDate(text) || "N/A",
    },
    {
      title: "Status",
      dataIndex: "activity_status",
      key: "activity_status",
      render: (text:string, record:any) => (
        <div
          className={`activity-text ${
            text === "billing"
              ? "billing-style"
              : text === "draft"
              ? "draft-style"
              : "default-style"
          }`}
        >
          {text || "N/A"}
        </div>
      ),
    },
  ];
  
  return (
    <div className="main">
      <div className="all-containers">
        <Sidebar />
        <div className="containers-section">
          <div className="containers-header">
            <h1>Containers</h1>
            <PlusIcon
              width={25}
              className="plus-icon"
              onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                toggleAddContainer()
              }
            />
          </div>

          {addContainer && <div className="overlay-backdrop"></div>}

          {addContainer && (
            <div className="addrepair-overlay-container">
              <div className="addrepair-overlay-content">
                <AddContainer onclose={closeAddContainer} />
              </div>
            </div>
          )}

          <div className="options">
            {sections.map((section, index) => (
              <p key={section} onClick={() => handleSectionClick(section)} className={activeSection === section ? "active-section" : ""}
              >
                {section}
              </p>
            ))}
          </div>

          <div className="container-details">
            <div className="search-container">
              <span className="search-icon">
                <SearchIcon width={17} />
              </span>
              <input
                type="text"
                className="search-box"
                placeholder="Search container by number"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              ></input>
              <div className="filters-container" onClick={toggleFilterMenu}>
                <Button className={`filter-button ${filterMenu ? 'change-button' : ''}`}>
                  <span className="filter-icon">
                    <FilterIcon width={20} />
                  </span>
                  Filters
                </Button>
               {filterMenu &&(
                <div className={`filter-menu ${filterMenu ? 'visible' : ''}`}>
                  <div className="filter-header__first-part">
                    <h4>Filters</h4>
                    <div className="filter-header__second-part">
                      <h4>Reset</h4>
                      <h4>Apply</h4>
                    </div>
                  </div>

                  <div className="filter-options-flex">

                  <div className="column-1">
      
                    <div className="filter-dropdown-date">
                      <label>Date</label>
                      <input type="date" className="filter-date-picker" placeholder="Select Date"></input>
                    </div>

                    <div className="filter-dropdown-date option-status">
                      <label>Status</label>
                      <select>
                        <option>Quote Draft</option>
                        <option>Inspection Draft</option>
                      </select>
                    </div>

                    <div className="filter-dropdown-date filter-dropdown-activity">
                    <label>Customer</label>
                      <select>
                        <option>Quote</option>
                        <option>Repair</option>
                        <option>Inspection</option>
                      </select>
                    </div>

                  </div>

                  <div className="column-2">

                  <div className="filter-dropdown-date option-activity">
                      <label>Activity</label>
                      <select>
                        <option>Draft</option>
                        <option>Inspection</option>
                      </select>
                    </div>


                    <div className="filter-dropdown-date option-yard">
                      <label>Yard</label>
                      <select>
                        <option>Nordel</option>
                        <option>Harbour Link</option>
                        <option>Aheer</option>
                      </select>
                    </div>
                  </div>
                  </div>
            
                  </div>
                   )}
                </div>
              </div>

            <div className="container-box__container">
            <Table columns={columns} dataSource={filterContainers(activeSection) ?? []}rowKey="uid" className="container-table"/>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default AllContainers;
