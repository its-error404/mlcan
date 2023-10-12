import React, { useState, useEffect, useRef } from "react";
import "./RepairList.scss";
import '../../styles/_@antOverrides.scss';
import { Icon } from '@iconify/react';
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import { ReactComponent as SearchIcon } from "../../assets/single color icons - SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/single color icons - SVG/filter.svg";
import { Table } from "antd";
import { ReactComponent as DeleteIcon } from "../../assets/Multicolor icons - SVG/Trash-Recycle Bin-Delete-User Interface-Remove.svg";
import { ReactComponent as VersionIcon } from "../../assets/single color icons - SVG/version.svg";
import { ReactComponent as DownIcon } from "../../assets/single color icons - SVG/accordion open.svg";
import { RepairData, Repair } from "../../models/repairList.model";
import SelectedEntry from "./SelectedEntry";
import EditRepair from "./EditRepair";
import AddRepair from './AddRepair'
import OverlayBox from "../../shared/components/overlayBox";
import BulkUploadComponent from "./BulkUpload";
import { RepairFormMeta, deleteRepairEntry, fetchRepairData } from "../../services/RepairListService/repair.service";
import ExportMenu from "../../shared/components/ExportMenu";
import { ColumnType} from "antd/lib/table";

const RepairList = () => {
 
  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setOverlayOpen(true);
  };

  const handleDeleteClick = (id: string, uid: string) => {
    setEntryToDeleteId(id);
    setEntryToDeleteUid(uid);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = async () => {
    if (entryToDeleteId) {
        await deleteRepairEntry(entryToDeleteId);
        fetchRepairData();
        setEntryToDeleteId(null);
        setEntryToDeleteUid(null);
        setShowDeleteConfirmation(false);
    }
  };

  const handleDeleteCancel = () => {
    setEntryToDeleteId(null);
    setEntryToDeleteUid(null);
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
  const [entryToDeleteId, setEntryToDeleteId] = useState<string | null>(null);
  const [entryToDeleteUid, setEntryToDeleteUid] = useState<string | null>(null);
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [versionMenu, setVersionMenu] = useState<boolean>(false);
  const [repairAreaData, setRepairAreaData] = useState("");
  const [damagedAreaData, setDamagedAreaData] = useState("");
  const [typeData, setTypeData] = useState("");
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState<Repair[]>([]);
  const [selectedEntryForEdit, setSelectedEntryForEdit] = useState<Repair | null>(null);
  const [displayedEntries, setDisplayedEntries] = useState(totalEntries);
  const [loading, setLoading] = useState<boolean>(false)
  const [dmgAreaOptions, setDmgAreaOptions] = useState<string[]>([])
  const [typeOptions, setTypeOptions] = useState<string[]>([])
  const [repairAreaOptions, setRepairAreaOptions] = useState<string[]>([])

  const [columns] = useState<ColumnType<Repair>[]>([
    {
      title: (
        <>
          Repair ID
        </>
      ),
      dataIndex: "uid",
      key: "uid",
      onCell: (record: Repair) => {
        return {
          onClick: () => handleRowClick(record),
        };
      },
      sorter: (a:Repair, b:Repair) => (a?.uid || '').localeCompare(b?.uid || '')
    },
    {
      title: <div className="sort-column">Repair Area</div>,
      dataIndex: "repArea",
      key: "repArea",
      render: (text: string) => text || 'N/A',
      sorter: (a:Repair, b:Repair) => (a?.repArea || '').localeCompare(b?.repArea || '')
    },    
    {
      title: (
        <>
          Damaged Area
        </>
      ),
      dataIndex: "dmgArea",
      key: "dmgArea",
      sorter: (a:Repair, b:Repair) => (a?.dmgArea || '').localeCompare(b?.dmgArea || '')
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => {
        if (text) {
          return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        }
        return text;
      },
      sorter: (a:Repair, b:Repair) => (a?.type || '').localeCompare(b?.type || '')
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
      render: (text: string, record: Repair) => {
        const nonMaerskHours = record.nonMaerskHours;
        return nonMaerskHours !== undefined && nonMaerskHours !== null
          ? nonMaerskHours
          : "-";
      }
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
      render: (text: string, record: Repair) => {
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
      render: (text: string, record: Repair) => {
        const unitHours = record.merc?.unitHours;
        return unitHours || "-";
      },
    },
    {
      title: (
        <>
          &emsp;&emsp;&emsp;Merc+ <br /> mat.cost/unit
        </>
      ),
      dataIndex: "MaxMatCost",
      key: "MaxMatCost",
      render: (text: string, record: Repair) => {
        const maxMatCost = record.merc?.maxMatCost;
        return maxMatCost || "-";
      },
    },
    {
      className: "edit-icon",
      render: ( record: Repair) => (
        <Icon icon="material-symbols:edit"  color="#949ea9" width={22}
          onClick={() => {
            handleEditClick(record);
          }}
        />
      ),
    },
    {
      className: "delete-icon",
      render: (text: string, record: Repair) => (
        <>
          <Icon icon="material-symbols:delete"  color="#949ea9" width={22}
            onClick={() => handleDeleteClick(record.id || '', record.uid ||'')}
          />
        </>
      ),
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { deserializedData } = await fetchRepairData();
        setRepairListData(deserializedData);
        setFilteredEntries(deserializedData.docs || []);
        setTotalEntries(deserializedData.docs?.length || 0);
        setDisplayedEntries(deserializedData.docs?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchOptions = async () => {
      try {
        const { repairTypeOptionsData, repAreaOptionsData, dmgAreaOptionsData } = await RepairFormMeta()
        setRepairAreaOptions(repAreaOptionsData)
        setTypeOptions(repairTypeOptionsData)
        setDmgAreaOptions(dmgAreaOptionsData)
      } catch (e) {console.log(e)}
    }
    fetchOptions()
  },[])

  useEffect(() => {
    const filteredData = applyFilters(repairListData?.docs || []).filter(
      (record: Repair) =>
        record?.uid?.toLowerCase().includes(searchData.toLowerCase())
    );

    setFilteredEntries(filteredData);
    setDisplayedEntries(filteredData.length);
  }, [searchData, repairListData]);

  let filterMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!filterMenuRef.current?.contains(e.target as Node)) {
        setFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const toggleAddRepair = () => {
    setAddRepair(!addRepair);
  };

  const getRowClassName = (record: Repair, index: number) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  const applyFilters = (data: any) => {
    return data.filter((doc: Repair) => {
      const repairAreaMatches =  repairAreaData === "" || doc.repArea === repairAreaData;
      const typeMatches = typeData === "" || doc?.type?.toLowerCase() === typeData.toLowerCase();
      const damagedAreaMatches = damagedAreaData === "" || doc.dmgArea === damagedAreaData;

      return repairAreaMatches && typeMatches && damagedAreaMatches;
    });
  };

  const handleApplyFilters = () => {
    const filteredData = applyFilters(repairListData?.docs || []);
    setFilteredEntries(filteredData);
    setFilterMenu(false);
    setDisplayedEntries(filteredData.length);
  };

  const handleResetFilters = () => {
    setRepairAreaData("");
    setDamagedAreaData("");
    setTypeData("");
    const filteredData = applyFilters(repairListData?.docs || []);
    setFilteredEntries(filteredData);
    setFilterMenu(false);
    setDisplayedEntries(filteredData.length);
  };

  const handleBulkUploadClick = () => {
    setShowBulkUpload(true);
  };

  const handleBulkUploadClose = () => {
    setShowBulkUpload(false);
  };

  const handleEditClick = (record: any) => {
    setSelectedEntryForEdit(record);
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

        {selectedEntryForEdit && (
          <div className="overlay">
            <div className="overlay-content">
              <EditRepair
                data={selectedEntryForEdit}
                onClose={() => {
                  setSelectedEntryForEdit(null);
                }}
                repairId={selectedEntryForEdit.id || ''} 
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
              <button  className={`repair-filter-button ${filterMenu ? "change-button" : ""
                    }`}>
                <span className="repair-filter-icon">
                  <FilterIcon width={20} />
                </span>
                Filters
              </button>
              <div
                className={`filter-menu repair-list-filters ${
                  filterMenu ? "visible" : "invisible"
                }`}
                onClick={(e) => e.stopPropagation()}
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
                    
                    <label>Repair area</label>
                    
                    <select
                      value={repairAreaData}
                      onChange={(e) => setRepairAreaData(e.target.value)}
                    >
                       <option value=''>Select</option>
                {repairAreaOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                    </select>
                  </div>
                  <div className="repair-damage">
                    
                    <label>Damaged area</label>
                    
                    <select
                      value={damagedAreaData}
                      onChange={(e) => setDamagedAreaData(e.target.value)}
                    >
                     {dmgAreaOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                    </select>
                  </div>
                </div>
                <div className="option-activity">
                  <label>Type</label>
                  
                  <select
                    value={typeData}
                    onChange={(e) => setTypeData(e.target.value)}
                  >
                   {typeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <ExportMenu/>
          <div
            className="versions-container"
            onClick={() => setVersionMenu(!versionMenu)}
          >
            <button className="version-button">
              <span className="version-icon">
                <VersionIcon width={20} />
              </span>
              Version 1 - 22 Aug 2020
              <span className="down-icon">
                <DownIcon width={10} />
              </span>
            </button>
          </div>

          <button
            className="bulk-upload-button"
            onClick={handleBulkUploadClick}
          >
            Bulk Upload
          </button>
        </div>
        {showBulkUpload && (
          <BulkUploadComponent onClose={handleBulkUploadClose} />
        )}
        <div className={`version-menu-box ${versionMenu ? "visible" : "invisible"}`}>
          <p>+ New Version </p>
          <p>Version 1 - 22 Aug 2020</p>
          <p>Version 1 - 22 Aug 2020</p>
        </div>

        <div className="repair-box__container">
          <Table
            loading={loading}
            rowClassName={getRowClassName}
            className="ant-table-repair"
            columns={columns}
            dataSource={filteredEntries}
            pagination={false}
          />
        </div>

        {showDeleteConfirmation && (
          <OverlayBox onClose={() => setShowDeleteConfirmation(false)}>
            <div className="delete-confirmation-box">
              <div className="delete-text-icon-repair">
                <DeleteIcon width={45} />
                <h2>
                  Are you sure to delete the <br />
                  &emsp; &emsp;Repair - <span>{entryToDeleteUid}</span>&nbsp;?
                </h2>
                <p>You can't undo this action</p>
              </div>
              <div className="delete-confirmation-buttons-repair">
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
