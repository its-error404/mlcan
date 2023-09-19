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
import { RepairData, Repair } from "../../models/repairList.model";
import "../../styles/_@antOverrides.scss";
import SelectedEntry from "./SelectedEntry";
import EditRepair from "./EditRepair";
import { deleteRepairEntry, fetchRepairData } from "../../services/RepairListService/repairlist.service";
import AddRepair from "./AddRepair";
import OverlayBox from "../../shared/components/overlayBox";
import BulkUploadComponent from "./BulkUpload";

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
      render: (text: string, record: any) => <EditIcon width={20} onClick={() => handleEditClick(record)} />,
      style: {
        marginRight: "-20px",
      },
    },
    {
      className: "delete-icon",
      render: (text: string, record: any) => (
        <>
          <DeleteIcon width={20} onClick={() => handleDeleteClick(record.id)} />
        </>
      ),
    },
  ]);

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setOverlayOpen(true);
  };

  const handleDeleteClick = (entryId: string) => {
    setEntryToDelete(entryId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = async () => {
    if (entryToDelete) {
      try {
        await deleteRepairEntry(entryToDelete);
        fetchRepairData();
        setEntryToDelete(null);
        setShowDeleteConfirmation(false);
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setEntryToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const [searchData, setSearchData] = useState("");
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [repairListData, setRepairListData] = useState<RepairData | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const [addRepair, setAddRepair] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [versionMenu, setVersionMenu] = useState<boolean>(false);
  const [exportMenu, setExportMenu] = useState<boolean>(false);
  const [repairAreaData, setRepairAreaData] = useState("");
  const [damagedAreaData, setDamagedAreaData] = useState("");
  const [typeData, setTypeData] = useState("");
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState<Repair[]>([]);
  const [selectedEntryForEdit, setSelectedEntryForEdit] = useState<RepairData | null>(null);
  const [displayedEntries, setDisplayedEntries] = useState(totalEntries);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { deserializedData } = await fetchRepairData();
        setRepairListData(deserializedData);
        setFilteredEntries(deserializedData.docs || []);
        setTotalEntries(deserializedData.docs?.length || 0);
        setDisplayedEntries(deserializedData.docs?.length || 0)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = applyFilters(repairListData?.docs || []).filter((record: any) =>
      record.uid.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilteredEntries(filteredData);
    setDisplayedEntries(filteredData.length);
  }, [searchData, repairListData]);

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


  const toggleExportMenu = () => {
    setExportMenu(!exportMenu);
  };

  const toggleAddRepair = () => {
    setAddRepair(!addRepair);
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
  
  const handleApplyFilters = () => {
    const filteredData = applyFilters(repairListData?.docs || []);
    setFilteredEntries(filteredData);
    setFilterMenu(false);
    setDisplayedEntries(filteredData.length)
  };

  const handleResetFilters = () => {
    setRepairAreaData("");
    setDamagedAreaData("");
    setTypeData("");
    const filteredData = applyFilters(repairListData?.docs || []);
    setFilteredEntries(filteredData);
    setFilterMenu(false);
  };

  const handleBulkUploadClick = () => {
    setShowBulkUpload(true);
  };

  const handleBulkUploadClose = () => {
    setShowBulkUpload(false);
  };

  const handleEditClick = (record: any) => {
    setSelectedEntryForEdit(record);
    setOverlayOpen(true)
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

        {addRepair && (
          <div className="overlay">
            <div className="overlay-content">
              <AddRepair
                onclose={() => {
                  setAddRepair(false);
                }}
              />
            </div>
          </div>
        )}

        <SelectedEntry
          selectedEntry={selectedRow}
          overlayOpen={overlayOpen}
          closeOverlay={() => {
            setSelectedRow(null);
          }}
          sectionIndex={sectionIndex}
          handleSectionClick={(index: number) => setSectionIndex(index)}
          setSectionIndex={setSectionIndex}
        />
        
        {selectedEntryForEdit !== null && selectedEntryForEdit?.docs && (
          
          <div className="overlay">
          <div className="overlay-content">
          <EditRepair
           data={selectedEntryForEdit.docs[0]}
           id={selectedEntryForEdit.docs[0].id || ""}
            onClose={() => {
              setSelectedEntryForEdit(null);
            }}
          />
            </div>
          </div>
        )}

        <div className="repair-search-container">
          <div className="repair-search">
          <span className="search-icon">
            <SearchIcon width={17} />
          </span>
          <input
            type="text"
            className="search-box"
            placeholder="Search by repair id"
            onChange={(e) => setSearchData(e.target.value)}
          ></input>
          </div>

          <div ref={filterMenuRef}>
            <div
              className="filters-container"
              onClick={() => {
                setFilterMenu(!filterMenu);
              }}
            >
              <Button className="repair-filter-button">
                <span className="repair-filter-icon">
                  <FilterIcon width={20} />
                </span>
                Filters
              </Button>
              <div
                className={`filter-menu repair-list-filters ${
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
                  <div className="filter-options-flex">
                    <div>
                      <br/>
                      <label>Repair area</label>
                      <br/>
                      <select
                        value={repairAreaData}
                        onChange={(e) => setRepairAreaData(e.target.value)}
                      >
                        <option>Doors</option>
                        <option>Vents</option>
                      </select>
                    </div>
                    <div className="repair-damage">
                    <br/>
                      <label>Damaged area</label>
                      <br/>
                      <select
                        value={damagedAreaData}
                        onChange={(e) => setDamagedAreaData(e.target.value)}
                      >
                        <option>Doors</option>
                        <option>Vents</option>
                      </select>
                    </div>
                  </div>
                    <div className="option-activity">
                      <label>Type</label>
                      <br/>
                      <select
                        value={typeData}
                        onChange={(e) => setTypeData(e.target.value)}
                      >
                        <option>INSERT</option>
                        <option>PATCH</option>
                      </select>
                    </div>
              </div>
            </div>
          </div>
          <div className="export-container" onClick={toggleExportMenu}>
            <Button className="export-button">
              <span className="export-icon">
                <ExportIcon width={20} />
              </span>
              Export
            </Button>
            <div
              className={`export-menu-box ${
                exportMenu ? "visible" : "invisible"
              }`}
            >
              <div>
                <p>Export as .csv</p>
              </div>
              <div>
                <p>Export as .xlsv</p>
              </div>
            </div>
          </div>
          <div
            className="versions-container"
            onClick={() => setVersionMenu(!versionMenu)}
          >
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

          <Button className="bulk-upload-button" onClick={handleBulkUploadClick}>Bulk Upload</Button>
        </div>
        {showBulkUpload && (
        <BulkUploadComponent onClose={handleBulkUploadClose} />
      )}
        <div
          className={`version-menu-box ${
            versionMenu ? "visible" : "invisible"
          }`}
        >
          <p>+ New Version </p>
          <p>Version 1 - 22 Aug 2020</p>
          <p>Version 1 - 22 Aug 2020</p>
        </div>

        <div className="repair-box__container">
          <Table
            rowClassName={getRowClassName}
            className="ant-table-repair"
            columns={columns}
            dataSource={filteredEntries}
            onRow={(record: any) => ({
              onClick: () => {
                handleRowClick(record);
              },
            })}
          />
        </div>

        {showDeleteConfirmation && (
          <OverlayBox onClose={() => setShowDeleteConfirmation(false)}>
            <div className="delete-confirmation-box">
              <div className="delete-text-icon">
                <DeleteIcon width={45} />
                <h2>
                  Are you sure you to delete the <br />
                  &emsp; &emsp;Repair - <span>RID005</span>&nbsp;?
                </h2>
                <p>You can't undo this action</p>
              </div>
              <div className="delete-confirmation-buttons">
                <button onClick={handleDeleteCancel}>Cancel</button>
                <button onClick={handleDeleteConfirmed}>Delete</button>
              </div>
            </div>
          </OverlayBox>
        )}
            <p className="total-records">
              Showing <span className="record-range"> 1 - {displayedEntries} </span>{" "}
              of <span className="total-range"> {totalEntries} </span>
            </p>
      </div>
    </div>
  );
};

export default RepairList;


