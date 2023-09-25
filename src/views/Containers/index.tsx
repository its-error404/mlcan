import React, { useEffect, useRef, useState } from "react";
import "./Containers.scss";
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import { ReactComponent as SearchIcon } from "../../assets/single color icons - SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/single color icons - SVG/filter.svg";
import { ReactComponent as ToggleIcon } from "../../assets/Multicolor icons - SVG/sort default.svg";
import { ReactComponent as AscToggleIcon } from "../../assets/Multicolor icons - SVG/sort asc.svg";
import { DatePicker, Table } from "antd";
import { getContainersData } from "../../services/ContainersService/containers.service";
import AddContainer from "./AddContainer";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "../../styles/_@antOverrides.scss";
import {
  AllContainersData,
  ContainersData,
} from "../../models/Containers.model";
import "antd/dist/antd.css";
import { ColumnsType } from "antd/lib/table";

const AllContainers = () => {
  const [searchData, setSearchData] = useState("");
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [addContainer, setAddContainer] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState("All");
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [activityData, setActivityData] = useState("");
  const [statusData, setStatusData] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [yardData, setYardData] = useState("");
  const [dateData, setDateData] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<ContainersData[]>([]);
  const [allContainersData, setContainersData] =
    useState<AllContainersData | null>(null);
  const [totalEntries, setTotalEntries] = useState<number | null>(null);
  const [displayedEntries, setDisplayedEntries] = useState(totalEntries);
  const [showActivityUidColumn, setShowActivityUidColumn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContainersData();
        if (data) {
          setContainersData(data.deserializedData);
          setFilteredEntries(
            (data.deserializedData.docs || []) as ContainersData[]
          );
          setTotalEntries(data.totalEntries || 0);
          setDisplayedEntries(data.totalEntries || 0);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

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

  const filterContainers = (section: string, searchQuery: string) => {
    if (!allContainersData?.docs) {
      return [];
    }

    const containers = allContainersData.docs as ContainersData[];

    let filteredData = containers.filter((doc) => {
      const searchMatches = doc.uid.toLowerCase().includes(searchQuery.toLowerCase());

      switch (section) {
        case "All":
          return searchMatches;
        case "Draft":
          return doc.activityStatus === "draft" && searchMatches;
        case "Admin Review Pending":
          return doc.activityStatus === "billing" && searchMatches;
        case "Pending Customer Approval":
          return doc.activityStatus === "pending" && searchMatches;
        case "Quotes Approved by Customers":
          return doc.activityStatus === "approved" && searchMatches;
        default:
          return false;
      }
    });

    return filteredData;
  };

  const handleSectionClick = (section: string) => {
    const newIndex = sections.indexOf(section);
    setSectionIndex(newIndex);
    const sectionFilteredData = filterContainers(section, searchData);
    setFilteredEntries(sectionFilteredData);
    setActiveSection(section);
    setDisplayedEntries(filteredEntries.length);
    setShowActivityUidColumn(section === "Draft");
  };

  const getRowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  const applyFilters = (data: any) => {
  
    const filteredData = data.filter((doc: any) => {
      const ActivityMatches = activityData === "" || doc.activityType === activityData;
      const statusMatches = statusData === "" || doc.activityStatus === statusData;
      const yardMatches = yardData === "" || doc.yard === yardData;
      const customerMatches = customerData === "" || doc.customerName === customerData;
      const dateMatches = dateData === "" || formatDate(doc.activityDate) === dateData;
      
      return (
        ActivityMatches &&
        customerMatches &&
        yardMatches &&
        statusMatches &&
        dateMatches
      );
    });
    
    return filteredData;
  };
  
  // useEffect(() => {
  //   const newfilteredData = applyFilters(ContainersData?.docs || []).filter(
  //     (record: any) =>
  //       record.uid.toLowerCase().includes(searchData.toLowerCase())
  //   );

  //   setFilteredEntries(newfilteredData);
  //   setDisplayedEntries(newfilteredData.length);
  // }, []);

  const handleApplyFilters = () => {
    const newFilteredData = applyFilters(filteredEntries);
    setFilteredEntries(newFilteredData);
    setFilterMenu(false);
    setDisplayedEntries(newFilteredData.length);
  };

  const handleResetFilters = () => {
    setActivityData("");
    setDateData("");
    setYardData("");
    setStatusData("");
    setCustomerData("");
    const newFilteredData = filterContainers(activeSection, searchData);
    setFilteredEntries(newFilteredData);
    setFilterMenu(false);
    setDisplayedEntries(newFilteredData.length);
  };

  const sections = [
    "All",
    "Draft",
    "Admin Review Pending",
    "Pending Customer Approval",
    "Quotes Approved by Customers",
  ];
  const columns: ColumnsType<ContainersData> = [
    {
      title: "Container Number",
      dataIndex: "uid",
      key: "uid",
      render: (text: string, record: any) => (
        <Link to={`/containers/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: (
        <>
          Yard <AscToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "yard",
      key: "yard",
    },
    {
      title: (
        <>
          Customer <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "customerName",
      key: "customerName",
      render: (text: string, record: any) => text || "N/A",
    },
    {
      title: (
        <>
          Owner Name <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "owner",
      key: "owner",
      render: (text: string, record: any) => text || "N/A",
    },

    {
      title: (
        <>
          {sectionIndex === 1 ? "Activity" : "Current Activity"}
          <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "activityType",
      key: "activityType",
      render: (text: string, record: any) => <div className="activityStatusCap">{text || 'N/A'}</div> || "N/A",
    },
    showActivityUidColumn && {
      title: (
        <>
          {sectionIndex === 1 ? "Activity ID" : ""}
          {sectionIndex === 1 && (
            <ToggleIcon width={8} style={{ marginLeft: 8 }} />
          )}
        </>
      ),
      dataIndex: "activityUid",
      key: "activityUid",
      render: (text: string, record: any) => text || "N/A",
    },
    {
      title: (
        <>
          Activity Status <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "activityDate",
      key: "activityDate",
      render: (text: string, record: any) => formatDate(text) || "N/A",
    },
    {
      title: (
        <>
          Status <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "activityStatus",
      key: "activityStatus",
      render: (text: string, record: any) => {
        let displayedText = "N/A";
        if (text === "billing") {
          displayedText = "Ready for Billing";
        } else if (text === "draft") {
          displayedText = "Quote Draft";
        }
    
        return (
          <div
            className={`activity-text ${
              text === "billing"
                ? "billing-style"
                : text === "draft"
                ? "draft-style"
                : "default-style"
            }`}
          >
            {displayedText}
          </div>
        );
      },
    },    
  ].filter(Boolean);
  let filterMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (!filterMenuRef.current?.contains(e.target)) {
        setFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

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

          {addContainer && (
            <div className="overlay">
              <div className="overlay-content">
                <AddContainer
                  onclose={() => {
                    setAddContainer(false);
                  }}
                />
              </div>
            </div>
          )}

          <div className="options">
            {sections.map((section, index) => (
              <p
                key={section}
                onClick={() => handleSectionClick(section)}
                className={activeSection === section ? "active-section" : ""}
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
                onChange={(e) => setSearchData(e.target.value)}
              ></input>

              <div ref={filterMenuRef}>
                <div
                  className="filters-container container-filter-container"
                  onClick={() => {
                    setFilterMenu(!filterMenu);
                  }}
                >
                  <button
                    className={`repair-filter-button ${
                      filterMenu ? "change-button" : ""
                    }`}
                  >
                    <span className="filter-icon">
                      <FilterIcon width={20} />
                    </span>
                    Filters
                  </button>
                  <div
                    className={`filter-menu repair-list-filters container-filter-menu ${
                      filterMenu ? "visible" : "invisible"
                    }`}
                    onClick={(e: any) => e.stopPropagation()}
                  >
                    <div className="filter-header__first-part">
                      <h4>Filters</h4>
                    </div>
                    <div className="filter-header__second-part">
                      <h4 onClick={handleResetFilters}>Reset</h4>
                      <h4 onClick={handleApplyFilters}>Apply</h4>
                    </div>

                    <div className="filter-options-containers">
                      <div className="column-1">
                        <label>Date</label>
                        <div className="container-date-box">
                          <input
                            type="date"
                            className="container-date-picker"
                            onChange={(e) => setDateData(e.target.value)}
                            value={dateData}
                          />
                        </div>

                        <div className="filter-dropdown-date choose-activity">
                          <label>Activity</label>
                          <select
                            value={activityData}
                            onChange={(e) => setActivityData(e.target.value)}
                          >
                            <option>draft</option>
                            <option>inspection</option>
                          </select>
                        </div>
                      </div>

                      <div className="column-2">
                        <div className="filter-dropdown-date">
                          <label>Status</label>
                          <select
                            value={statusData}
                            onChange={(e) => setStatusData(e.target.value)}
                          >
                            <option>billing</option>
                            <option>draft</option>
                          </select>
                        </div>

                        <div className="filter-dropdown-date option-yard">
                          <label>Yard</label>
                          <select
                            value={yardData}
                            onChange={(e) => setYardData(e.target.value)}
                          >
                            <option>Nordel</option>
                            <option>Harbourlink</option>
                            <option>Aheer</option>
                          </select>
                        </div>
                      </div>

                      <div className="filter-dropdown-date">
                        <label>Customer</label>
                        <select
                          value={customerData}
                          onChange={(e) => setCustomerData(e.target.value)}
                        >
                          <option>Krishna</option>
                          <option>Killian Darian</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-box__container">
              <Table
                columns={columns}
                dataSource={filteredEntries}
                rowKey="uid"
                className="container-table"
                rowClassName={getRowClassName}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllContainers;
