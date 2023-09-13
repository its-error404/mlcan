import React, { useState, useEffect } from "react";
import "./RepairList.scss";
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import { ReactComponent as SearchIcon } from "../../assets/single color icons - SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/single color icons - SVG/filter.svg";
import { Button, Modal, Table } from "antd";
import { ReactComponent as ToggleIcon } from "../../assets/Multicolor icons - SVG/sort default.svg";
import { ReactComponent as EditIcon } from "../../assets/single color icons - SVG/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/single color icons - SVG/delete.svg";
import { ReactComponent as ExportIcon } from "../../assets/single color icons - SVG/export.svg";
import { ReactComponent as VersionIcon } from "../../assets/single color icons - SVG/version.svg";
import { ReactComponent as DownIcon } from "../../assets/single color icons - SVG/accordion open.svg";
import { fetchRepairData } from "../../services/RepairListService/repairlist.service";
import { RepairData } from "../../models/repairList.model";
import { useRowClick } from "../../shared/hooks/useRowClick";
import { useSectionClick } from "../../shared/hooks/useSectionClick";
import "../../styles/_@antOverrides.scss";
import { deleteRepairEntry } from "../../services/RepairListService/deleterepair.service";
import AddRepair from "./AddRepair";
import SelectedEntry from "./SelectedEntry";
import EditRepair from "./EditRepair";

const RepairList = () => {
  const [columns, setColumns] = useState([
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
      render: (text: string, record:any) => (
      <div onClick={()=> handleEditClick(record)}>
      <EditIcon width={20} />
      </div>
      ),
      style: {
        marginRight: "-20px",
      },
    },
    {
      className: "delete-icon",
      render: (text: string, record: any) => (
        <>
          <DeleteIcon width={20} onClick={() => showDeleteConfirmationModal(record.id)} />
          <Modal
            title="Confirm Deletion"
            visible={deleteConfirmationVisible && record.id === recordToDeleteId}
            onOk={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          >
            <p>Are you sure you want to delete this entry?</p>
          </Modal>
        </>
      ),
    },
  ]);

  const showDeleteConfirmationModal = (id:any) => {
    setRecordToDeleteId(id);
    setDeleteConfirmationVisible(true);
  };
  
  const handleDeleteCancel = () => {
    setRecordToDeleteId(null);
    setDeleteConfirmationVisible(false);
  };

  const handleDeleteConfirm = async () => {
    if (recordToDeleteId) {
      try {
        await deleteRepairEntry(recordToDeleteId);
        setRecordToDeleteId(null);
        setDeleteConfirmationVisible(false);
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  const handleRowClick = (row: any) => {
    if (!editIconClicked) {
    setSelectedRow(row);
    setOverlayOpen(true);
    }
  };

  const openOverlay = () => {
    setOverlayOpen(true);
  }

  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  const handleEditIconClick = (row: any) => {
    if (row.uid !== null) {
      setClickedRepairId(row.uid);
    }
  };

  const handleDeleteClick = (id:string) => {

    deleteRepairEntry(id);
  };

  const handleEditClick = (doc: any) => {
    setEditedData(doc);
    setEditRepairVisible(true); 
    setEditRepairId(doc.id)
    closeOverlay()
  };

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState(null);
  const [editIconClicked, setEditIconClicked] = useState(false);
  const [editRepairId, setEditRepairId] = useState("");
  const [searchData, setSearchData] = useState("");
  const handleSectionClick = useSectionClick();
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [repairListData, setRepairListData] = useState<RepairData | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addRepair, setAddRepair] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const [editRepairVisible, setEditRepairVisible] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRepairId, setClickedRepairId] = useState<string | null>(null);
  const entriesPerPage = 1;

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

  const filteredEntries = repairListData?.docs?.filter((doc) =>
    doc.uid?.toLowerCase().includes(searchData.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleAddRepair = () => {
    setAddRepair(!addRepair);
  };

  const closeAddRepair = () => {
    setAddRepair(false);
  };

  const deleteEntry = (doc: any) => {
    console.log(doc);
    deleteRepairEntry(doc);
  };

  const getRowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
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
  <EditRepair
    editedData={editedData}
    onClose={() => {
      setEditIconClicked(false);
      setClickedRepairId(null);
    }}
    repairId={clickedRepairId || ""}
    overlayOpen={overlayOpen}
  />
) : (

  <SelectedEntry
    selectedEntry={selectedRow}
    overlayOpen={overlayOpen}
    closeOverlay={() => {
      setOverlayOpen(false);
      setSelectedRow(null)
    }}
    sectionIndex={sectionIndex}
    handleSectionClick={(index: number) => setSectionIndex(index)}
    setSectionIndex={setSectionIndex}
  />
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
          <Button className="filter-button">
            <span className="repair-first-icon">
              <FilterIcon width={20} />
            </span>
            Filters
          </Button>
          <Button className="filter-button">
            <span className="repair-filter-icon">
              <ExportIcon width={20} />
            </span>
            Export
          </Button>
          <Button className="version-button">
            <span className="repair-filter-icon">
              <VersionIcon width={20} />
            </span>
            Version 1 - 22 Aug 2020
            <span className="down-icon">
              <DownIcon width={10} />
            </span>
          </Button>
          <Button className="bulk-upload-button">Bulk Upload</Button>
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
          clickedElement.classList.contains("cls-1")
        if (!isExcludedColumn) {
          handleRowClick(record);
        }
      },
    };
  }}
/>
        </div>
        {editMode && (
          <EditRepair editedData={editedData} onClose={() => setEditMode(false)} repairId={editRepairId} overlayOpen={overlayOpen}/>
        )}
        <div className="bottom-flex">
          <p className="total-records">
            Showing <span className="record-range"> 1 - 5 </span> of{" "}
            <span className="total-range"> {totalEntries} </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepairList;
