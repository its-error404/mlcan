import React, { useEffect, useRef, useState } from "react";
import "./Containers.scss";
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import { ReactComponent as SearchIcon } from "../../assets/single color icons - SVG/search.svg";
import { ReactComponent as ToggleIcon } from "../../assets/Multicolor icons - SVG/sort default.svg";
import { ReactComponent as AscToggleIcon } from "../../assets/Multicolor icons - SVG/sort asc.svg";
import { Table } from "antd";
import {  getContainersData } from "../../services/ContainersService/containers.service";
import AddContainer from "./AddContainer";
import { format } from "date-fns";
import { Link, } from "react-router-dom";
import '../../styles/_@antOverrides.scss'
import { AllContainersData, ContainersData } from "../../models/Containers.model";
import 'antd/dist/antd.css';

const AllContainers = () => {

  const [searchData, setSearchData] = useState("");
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [addContainer, setAddContainer] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState("All")
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [activityData, setActivityData] = useState("");
  const [statusData, setStatusData] = useState("");
  const [customerData, setCustomerData] = useState("");
  const [yardData, setYardData] = useState("");
  const [dateData, setDateData] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState<ContainersData[]>([]);
  const [allContainersData, setContainersData] = useState<AllContainersData | null>(null)
  const [totalEntries, setTotalEntries] = useState<number | null>(null);
  const [displayedEntries, setDisplayedEntries] = useState(totalEntries);
  const [showActivityUidColumn, setShowActivityUidColumn] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContainersData();
        if (data) {
          setContainersData(data.deserializedData);
          setFilteredEntries((data.deserializedData.docs || []) as ContainersData[]);
          setTotalEntries(data.totalEntries || 0);
          setDisplayedEntries(data.totalEntries || 0)
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
    
    let filteredData = [] as ContainersData[];
  switch (section) {
    case "All":
      filteredData = containers;
      break;
    case "Draft":
      filteredData = containers.filter((doc) => doc.activityStatus === "draft");
      break;
    case "Admin Review Pending":
      filteredData = containers.filter((doc) => doc.activityStatus === "billing");
      break;
    case "Pending Customer Approval":
      filteredData = containers.filter((doc) => doc.activityStatus === "pending");
      break;
    case "Quotes Approved by Customers":
      filteredData = containers.filter((doc) => doc.activityStatus === "approved");
      break;
    default:
      filteredData = [];
  }

  filteredData = filteredData.filter((doc) =>
  {
  if(doc.uid) {
    doc.uid.toLowerCase().includes(searchQuery.toLowerCase())
  }
}
  );

  return filteredData;
}

  const handleSectionClick = (section: string) => {
    const newIndex = sections.indexOf(section);
    setSectionIndex(newIndex);
    setActiveSection(section);
    setShowActivityUidColumn(section === "Draft");
  }

  const getRowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  const applyFilters = (data: any) => {
    return data.filter((doc: any) => {
      const ActivityMatches = activityData === "" || doc.activityType === activityData;
      const statusMatches = statusData === "" || doc.activityStatus === statusData;
      const yardMatches = yardData === "" || doc.yard === yardData;
      const customerMatches = customerData === "" || doc.customerName === customerData;
      const dateMatches = dateData === null || doc.activityDate === dateData;
  
      return ActivityMatches && customerMatches && yardMatches && statusMatches && dateMatches;
    });
  };
  
  const handleApplyFilters = () => {
    const filteredData = applyFilters(allContainersData?.docs || []);
    setFilteredEntries(filteredData);
    setFilterMenu(false);
    setDisplayedEntries(filteredData.length)
  };

  const handleResetFilters = () => {
    setActivityData("");
    setDateData(null);
    setYardData("");
    setStatusData("")
    setCustomerData("")
    const filteredData = applyFilters(ContainersData?.docs || []);
    setFilteredEntries(filteredData);
    setFilterMenu(false);
  };


  const sections = ["All", "Draft", "Admin Review Pending", "Pending Customer Approval", "Quotes Approved by Customers"];
  const columns = [
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
      render: (text: string) => (showActivityUidColumn ? text : null),
    },
    {
      title: (
        <>
          Customer <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "customerName",
      key: "customerName",
      render: (text: string) => (showActivityUidColumn ? text || "N/A" : null),
    },
    {
      title: (
        <>
          Owner Name <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "owner",
      key: "owner",
      render: (text: string) => (showActivityUidColumn ? text || "N/A" : null),
    },
    {
      title: (
        <>
          {sectionIndex === 1 ? "Activity" : "Current Activity"}
          {sectionIndex === 1 && <ToggleIcon width={8} style={{ marginLeft: 8 }} />}
        </>
      ),
      dataIndex: "activityType",
      key: "activityType",
      render: (text: string) => (showActivityUidColumn ? text || "N/A" : null),
    },
    {
      title: (
        <>
          {sectionIndex === 1 ? "Activity ID" : ""}
          {sectionIndex === 1 && <ToggleIcon width={8} style={{ marginLeft: 8 }} />}
        </>
      ),
      dataIndex: "activityUid",
      key: "activityUid",
      render: (text: string) => (showActivityUidColumn ? text || "N/A" : null),
    },
    {
      title: (
        <>
          Activity Status <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "activityDate",
      key: "activityDate",
      render: (text: string, record: any) =>
        showActivityUidColumn ? (formatDate(text) || "N/A") : null,
    },
    {
      title: (
        <>
          Status <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "activityStatus",
      key: "activityStatus",
      render: (text: string, record: any) => (
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
                <AddContainer onclose={()=> { setAddContainer(false)}} />
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
                onChange={(e) => setSearchData(e.target.value)}
              ></input>
              </div>

            <div className="container-box__container">
            <Table columns={columns} dataSource={applyFilters(filterContainers(activeSection, searchData))} rowKey="uid" className="container-table" rowClassName={getRowClassName} pagination={false}/>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default AllContainers;
