import React, { useState, useEffect, useRef } from "react";
import "./RepairList.scss";
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import { ReactComponent as SearchIcon } from "../../assets/single color icons - SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/single color icons - SVG/filter.svg";
import { Button, Table } from "antd";
import { ReactComponent as ToggleIcon } from "../../assets/Multicolor icons - SVG/sort default.svg";
import { ReactComponent as EditIcon } from "../../assets/single color icons - SVG/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/single color icons - SVG/delete.svg";
import { ReactComponent as ExportIcon } from "../../assets/single color icons - SVG/export.svg";
import { ReactComponent as VersionIcon } from "../../assets/single color icons - SVG/version.svg";
import { ReactComponent as DownIcon } from "../../assets/single color icons - SVG/accordion open.svg";
import { fetchRepairData } from "../../services/RepairListService/repairlist.service";
import { Repair, RepairData } from "../../models/repairList.model";
import "../../styles/_@antOverrides.scss";
import SelectedEntry from "./SelectedEntry";
import EditRepair from "./EditRepair";

const RepairList = () => {
  const [columns] = useState([
    {
      title: (
        <>
          Repair ID <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: (
        <>
          Repair Area <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "repArea",
      key: "repArea",
      style: {
        marginLeft: "8px",
        Width: 200,
      },
    },
    {
      title: (
        <>
          Damaged Area <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "dmgArea",
      key: "dmgArea",
    },
    {
      title: (
        <>
          Type <ToggleIcon width={8} style={{ marginLeft: 8 }} />
        </>
      ),
      dataIndex: "type",
      key: "type",
      style: {
        marginLeft: "20px",
      },
    },
    {
      title: (
        <>
          Non-Maersk
          <br />
          &emsp;&emsp;&emsp;hours
        </>
      ),
      dataIndex: "nonMaerskHours",
      key: "nonMaerskHours",
      render: (text: string, record: any) => {
        const nonMaerskHours = record.nonMaerskHours;
        return nonMaerskHours !== undefined && nonMaerskHours !== null
          ? nonMaerskHours
          : "-";
      },
      style: {
        marginLeft: "20px !important",
      },
    },
    {
      title: (
        <>
          Non-Maersk
          <br />
          &emsp;&emsp;mat.cost
        </>
      ),
      dataIndex: "nonMaerskMatCost",
      key: "nonMaerskMatCost",
      render: (text: string, record: any) => {
        const nonMaerskMatCost = record.nonMaerskMatCost;
        return nonMaerskMatCost !== undefined && nonMaerskMatCost !== null
          ? nonMaerskMatCost
          : "-";
      },
    },
    {
      title: (
        <>
          &emsp;&emsp;Merc+
          <br />
          hours/unit
        </>
      ),
      dataIndex: "unitHours",
      key: "unitHours",
      render: (text: string, record: any) => {
        const unitHours = record.merc?.maxMatCost;
        return unitHours || "-";
      },
    },
    {
      title: (
        <>
          &emsp;&emsp;&emsp;Merc+ <br /> mat.cost/unit
        </>
      ),
      data: "MaxMatCost",
      key: "MaxMatCost",
      render: (text: string, record: any) => {
        const maxMatCost = record.merc?.maxMatCost;
        return maxMatCost || "-";
      },
    },
    {
      className: "edit-icon",
      render: (text: string, record: any) => (
        <div onClick={() => handleEditClick(record)}>
          <EditIcon width={20} />
        </div>
      ),
      style: {
        marginRight: "-20px",
      },
    },
    {
      className: "delete-icon",
      render: (text: string, record: any) => <DeleteIcon width={20} />,
    },
  ]);

  const handleRowClick = (row: any) => {
    if (!editIconClicked) {
      setSelectedRow(row);
      setOverlayOpen(true);
    }
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  const handleEditClick = (doc: any) => {
    setEditedData(doc);
    setEditRepairVisible(true);
    setEditRepairId(doc.id);
    closeOverlay();
  };

  const [editIconClicked, setEditIconClicked] = useState(false);
  const [editRepairId, setEditRepairId] = useState("");
  const [searchData, setSearchData] = useState("");
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [repairListData, setRepairListData] = useState<RepairData | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const [addRepair, setAddRepair] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const [editRepairVisible, setEditRepairVisible] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRepairId, setClickedRepairId] = useState<string | null>(null);
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [versionMenu, setVersionMenu] = useState<boolean>(false);
  const [exportMenu, setExportMenu] = useState<boolean>(false);
  const [repairAreaData, setRepairAreaData] = useState("");
  const [damagedAreaData, setDamagedAreaData] = useState("");
  const [typeData, setTypeData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { deserializedData } = await fetchRepairData();
        setRepairListData(deserializedData);
        setTotalEntries(deserializedData.docs?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  let filteredEntries = repairListData?.docs?.filter((doc) =>
    doc.uid?.toLowerCase().includes(searchData.toLowerCase())
  );

  const applyFiltersAndSort = (data: Repair) => {
    applyFilters(repairListData?.docs || []);
  };

  const toggleExportMenu = () => {
    setExportMenu(!exportMenu);
  };

  const toggleAddRepair = () => {
    setAddRepair(!addRepair);
  };

  const closeAddRepair = () => {
    setAddRepair(false);
  };

  const getRowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  const applyFilters = (data: any) => {
    return data.filter((doc: any) => {
      const repairAreaMatches =
        repairAreaData === "" || doc.repArea === repairAreaData;
      const typeMatches = typeData === "" || doc.type === typeData;
      const damagedAreaMatches =
        damagedAreaData === "" || doc.dmgArea === damagedAreaData;

      return repairAreaMatches && typeMatches && damagedAreaMatches;
    });
  };

  return (
    <div className="repair-list">
      <Sidebar />
      <div className="repairs-section">
        <div className="repairs-header">
          <h1>Repair List</h1>
          <PlusIcon
            width={25}
            className="plus-icon"
            onClick={toggleAddRepair}
          />
        </div>
        {editRepairVisible ? (
          <EditRepair editedData={editedData} onClose={() => {setEditIconClicked(false); setClickedRepairId(null);}} repairId={clickedRepairId || ""} overlayOpen={overlayOpen}
            closeOverlay={closeOverlay}
          />
        ) : (
          <SelectedEntry selectedEntry={selectedRow} overlayOpen={overlayOpen} closeOverlay={() => {setOverlayOpen(false); setSelectedRow(null);}} sectionIndex={sectionIndex} handleSectionClick={(index: number) => setSectionIndex(index)} setSectionIndex={setSectionIndex}/>
        )}

        <div className="repair-search-container">
          <span className="search-icon">
            <SearchIcon width={17} />
          </span>
          <input
            type="text"
            className="search-box"
            placeholder="Search by repair id"
            onChange={(e) => setSearchData(e.target.value)}
          ></input>

          <div ref={filterMenuRef}>
            <div className="filters-container" onClick={() => {setFilterMenu(!filterMenu);}}>
              <Button className="filter-button">
                <span className="filter-icon">
                  <FilterIcon width={20} />
                </span>
                Filters
              </Button>
              <div className={`filter-menu repair-list-filters ${filterMenu ? "visible" : "invisible"}`} onClick={(e: any) => e.stopPropagation()}>
                <div className="filter-header__first-part">
                  <h4>Filters</h4>
                  <div className="filter-header__second-part">
                    <h4>Reset</h4>
                    <h4 onClick={(e) => {
                        console.log(e.target.addEventListener('click', (e:any) => e.stopPropagation()))
                        console.log("apply");
                        const filteredData = applyFilters(repairListData?.docs || []);
                        filteredEntries = filteredData;
                      }}
                    >Apply
                    </h4>
                  </div>
                </div>
                <div className="filter-options-flex">
                  <div className="column-1">
                    <div className="filter-dropdown-date option-status">
                      <label>Repair area</label>
                      <select
                        value={repairAreaData}
                        onChange={(e) => setRepairAreaData(e.target.value)}>
                        <option>Doors</option>
                        <option>Vents</option>
                      </select>
                    </div>
                    <div className="filter-dropdown-date option-activity">
                      <label>Type</label>
                      <select
                        value={typeData}
                        onChange={(e) => setTypeData(e.target.value)}>
                        <option>INSERT</option>
                        <option>PATCH</option>
                      </select>
                    </div>
                  </div>
                  <div className="column-2 repair-filter-column-2">
                    <div className="filter-dropdown-date filter-dropdown-activity repair-damage">
                      <label>Damaged area</label>
                      <select
                        value={damagedAreaData}
                        onChange={(e) => setDamagedAreaData(e.target.value)}>
                        <option>Doors</option>
                        <option>Vents</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div className="export-container" onClick={toggleExportMenu}>
              <Button className="filter-button">
                <span className="repair-filter-icon">
                  <ExportIcon width={20} />
                </span>
                Export
              </Button>
              <div className={`export-menu-box ${exportMenu ? "visible" : "invisible"}`}>
                <div>
                  <p>Export as .csv</p>
                </div>
                <div>
                  <p>Export as .xlsv</p>
                </div>
              </div>
            </div>
          <div className="versions-container" onClick={() => setVersionMenu(!versionMenu)}>
            <Button className="version-button">
              <span className="repair-filter-icon">
                <VersionIcon width={20} />
              </span>
              Version 1 - 22 Aug 2020
              <span className="down-icon">
                <DownIcon width={10} />
              </span>
            </Button>
          </div>

          <Button className="bulk-upload-button">Bulk Upload</Button>
        </div>
    
          <div className={`version-menu-box ${versionMenu ? "visible" : "invisible"}`}>
            <p>+ New Version </p>
            <p>Version 1 - 22 Aug 2020</p>
            <p>Version 1 - 22 Aug 2020</p>
          </div>
       
        <div className="repair-box__container">
          <Table
            className="ant-table-repair"
            columns={columns}
            dataSource={filteredEntries}
            rowClassName={getRowClassName}
            onRow={(record: any) => {
              return {
                onClick: (event) => {
                  const clickedElement = event.target as HTMLElement;
                  const isExcludedColumn =
                    clickedElement.classList.contains("cls-1");
                  if (!isExcludedColumn) {
                    handleRowClick(record);
                  }
                },
              };
            }}
          />
        </div>
        {editMode && (
          <EditRepair editedData={editedData} onClose={() => setEditMode(false)} repairId={editRepairId} overlayOpen={overlayOpen} closeOverlay={() => {setOverlayOpen(false); setSelectedRow(null);}}/>
        )}

        <div className="bottom-flex">
          <p className="total-records">
            Showing <span className="record-range"> 1 - {totalEntries} </span> of{" "}
            <span className="total-range"> {totalEntries} </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepairList;
