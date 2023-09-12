import React, { useState } from "react";
import "./RepairList.scss";
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import { ReactComponent as SearchIcon } from "../../assets/single color icons - SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/single color icons - SVG/filter.svg";
import { Button } from "antd";
import { ReactComponent as ToggleIcon } from "../../assets/Multicolor icons - SVG/sort default.svg";
import { ReactComponent as EditIcon } from "../../assets/single color icons - SVG/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/single color icons - SVG/delete.svg";
import { ReactComponent as ExportIcon } from "../../assets/single color icons - SVG/export.svg";
import { ReactComponent as VersionIcon } from "../../assets/single color icons - SVG/version.svg";
import { ReactComponent as DownIcon } from "../../assets/single color icons - SVG/accordion open.svg";
import { ReactComponent as CloseIcon } from "../../assets/single color icons - SVG/close.svg";
import {
  useFetchData,
  useRowClick,
  useSectionClick,
} from "../../services/RepairListService/repairlist.service";
import AddRepair from "./AddRepair";
import EditRepair from "./EditRepair";
import { deleteRepairEntry } from "../../services/RepairListService/deleterepair.service";
import React, { useState, useEffect } from 'react'
import './RepairList.scss'
import Sidebar from '../../shared/components/Sidebar/index'
import { ReactComponent as PlusIcon } from '../../assets/single color icons - SVG/add.svg'
import { ReactComponent as SearchIcon } from '../../assets/single color icons - SVG/search.svg'
import { ReactComponent as FilterIcon } from '../../assets/single color icons - SVG/filter.svg'
import { Button, DatePicker, Pagination, Table } from 'antd'
import { ReactComponent as ToggleIcon } from '../../assets/Multicolor icons - SVG/sort default.svg'
import { ReactComponent as EditIcon } from '../../assets/single color icons - SVG/edit.svg'
import { ReactComponent as DeleteIcon } from '../../assets/single color icons - SVG/delete.svg'
import { ReactComponent as ExportIcon } from '../../assets/single color icons - SVG/export.svg'
import { ReactComponent as VersionIcon } from '../../assets/single color icons - SVG/version.svg'
import { ReactComponent as DownIcon } from '../../assets/single color icons - SVG/accordion open.svg'
import { fetchRepairData } from '../../services/RepairListService/repairlist.service'
import { RepairData } from '../../models/repairList.model'
import { useRowClick } from '../../shared/hooks/useRowClick'
import { useSectionClick } from '../../shared/hooks/useSectionClick'
import '../../styles/_@antOverrides.scss'

const RepairList = () => {
  const [searchData, setSearchData] = useState("");
  const { repairListData, totalEntries } = useFetchData(searchData);

  const [columns, setColumns] = useState([
    {
      title: (
        <>
          Repair ID <ToggleIcon width={8} style={{ marginLeft: 8 }} /> 
        </>
      ),
      dataIndex: 'uid',
      key: 'uid'
    },
    {
      title: (
        <>
          Repair Area <ToggleIcon width={8} style={{ marginLeft: 8 }} /> 
        </>
      ),
      dataIndex: 'repArea',
      key: 'repArea',
      style: {
        marginLeft: '8px',
        Width: 200,
      }
    },
    {
      title: (
        <>
          Damaged Area <ToggleIcon width={8} style={{ marginLeft: 8 }} /> 
        </>
      ),
      dataIndex: 'dmgArea',
      key: 'dmgArea'
    },
    {
      title: (
        <>
          Type <ToggleIcon width={8} style={{ marginLeft: 8 }} /> 
        </>
      ),
      dataIndex: 'type',
      key: 'type',
      style: {
        marginLeft: '20px'
      }
    },
    {
      title: (
        <>
          Non-Maersk<br />&emsp;&emsp;&emsp;hours
        </>
      ),
      dataIndex: 'nonMaerskHours',
      key: 'nonMaerskHours',
      style: {
        marginLeft: '20px !important'
      }
    },
    {
      title: (
        <>
          Non-Maersk<br />&emsp;&emsp;mat.cost
        </>
      ),
      dataIndex: 'nonMaerskMatCost',
      key: 'nonMaerskMatCost',
      render: (text:string,record:any) => {
        const nonMaerskMatCost = record.nonMaerskMatCost;
        return nonMaerskMatCost !== undefined && nonMaerskMatCost !== null
          ? nonMaerskMatCost
          : '-';
      },
    },
    {
      title: (
        <>
          &emsp;&emsp;Merc+<br />hours/unit
        </>
      ),
      dataIndex:'unitHours',
      key:'unitHours',
      render: (text:string,record:any) => {
        const unitHours = record.merc?.maxMatCost
        return unitHours || '-'
      }
    },
    {
      title: (
        <>
         &emsp;&emsp;&emsp;Merc+ <br/> mat.cost/unit
        </>
      ),
      data: 'MaxMatCost',
      key: 'MaxMatCost',
      render: (text:string,record:any) => {
        const maxMatCost = record.merc?.maxMatCost
        return maxMatCost || '-'
      }
    }, 
    {
      className: 'edit-icon',
      render: (text:string) => (
        <EditIcon width={20}/>
      ),
      style: {
        marginRight: '-20px'
      }
    },
    {
      className: 'delete-icon',
      render: (text:string) => (
        <DeleteIcon width={20}/>
      ),
    },
  ])
  const [searchData, setSearchData] = useState('')
  const { selectedEntry, handleRowClick } = useRowClick();
  const handleSectionClick = useSectionClick();
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
  const [addRepair, setAddRepair] = useState<boolean>(false)
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<any>(null)

 const toggleAddRepair =() => {
  setAddRepair(!addRepair)
 }

 const closeAddRepair =() => {
  setAddRepair(false)
 }

  const openOverlay = () => {
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  const handleEditClick = (doc:any) => {
    setEditedData(doc);
    setEditMode(true);
  };

  const deleteEntry = (doc:any) => {
    console.log(doc);
    deleteRepairEntry(doc)
  }

  const handleSectionClick = useSectionClick()
  const [sectionIndex, setSectionIndex] = useState<number>(0)
  const [repairListData, setRepairListData] = useState<RepairData | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const entriesPerPage = 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { deserializedData } = await fetchRepairData();
        setRepairListData(deserializedData)
        setTotalEntries(deserializedData.docs?.length || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const filteredEntries = repairListData?.docs?.filter((doc) => (
    doc.uid?.toLowerCase().includes(searchData.toLowerCase())
  ))

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

    const getRowClassName = (record:any, index:number) => {
      return index % 2 === 0 ? 'even-row' : 'odd-row';
    };
  
  return (
    <div className={`repair-list ${overlayOpen ? 'overlay-content-open' : ''}`}>

    <div className='repair-list'>
      
      <Sidebar />
      <div className="repairs-section">
        <div className="repairs-header">
      
      <div className='repairs-section'>
        <div className='repairs-header'>
          <h1>Repair List</h1>
          <PlusIcon
                  width={25}
                  className="plus-icon"
                  onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => toggleAddRepair()}
                  />
        </div>

        {addRepair && (
    <div className="overlay-backdrop"></div>
  )}
        {addRepair && (
      <div className="addrepair-overlay-container">
        <div className="addrepair-overlay-content">
          <AddRepair onclose={closeAddRepair} />
        </div>
      </div>
    )}

{editMode && (
    <div className="overlay-backdrop"></div>
  )}

    {editMode &&(
      <div className="addrepair-overlay-container">
        <div className="addrepair-overlay-content">
        <EditRepair onClose={() => setEditMode(false)} data={editedData} id={editedData?.merc?.id} />
        </div>
      </div>
    )}
        <div className="repair-search-container">
          <span className="search-icon">
            <SearchIcon width={17} />
          </span>
          <input
            type="text"
            className="search-box"
            placeholder="Search by repair id"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            type='text'
            className='search-box'
            placeholder='Search by repair id'
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
          <table className="repair-box__table">
            <thead>
              <tr className="repair-box__rows">
                <th align='left'>
                  Repair ID
                  <span>
                    <ToggleIcon width={8} />
                  </span>
                </th>
                <th align="left">
                  Repair Area
                  <span>
                    <ToggleIcon width={8} />
                  </span>
                </th>
                <th align="left">
                  Damaged Area
                  <span>
                    <ToggleIcon width={8} />
                  </span>
                </th>
                <th align="left">
                  Type
                  <span>
                    <ToggleIcon width={8} />
                  </span>
                </th>
                <th>
                  Non-Maersk
                  <br />
                  &emsp;&emsp;&emsp;hours
                </th>
                <th align="right">
                  Non-Maersk <br />
                  &emsp;&emsp;mat.cost
                </th>
                <th align="center">
                  &emsp;&emsp;Merc+ <br />
                  hours/unit
                </th>
                <th align="right">
                  &emsp;&emsp;&emsp;Merc+ <br />
                  mat.cost/unit
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="repair-list__entries">
              {repairListData?.data?.docs.map((doc, index) => (
                <tr
                  className={
                    index % 2 === 0 ? "repair-id__even" : "repair-id__odd"
                  }
                  key={doc.uid}
                >
                  <td align="left" onClick={() => {
                    handleRowClick(doc);
                    openOverlay();
                  }}>{doc.uid}</td>
                  <td align="justify">{doc.rep_area}</td>
                  <td align="justify">{doc.dmg_area}</td>
                  <td align="justify">{doc.type}</td>
                  <td align="center">{doc.nmaersk}</td>
                  <td align="right">
                    {doc.merc?.max_mat_cost ? `${doc.merc.max_mat_cost}$` : ""}
                  </td>
                  <td align="center">{doc.merc?.unit_hours}</td>
                  <td align="right">
                    {doc.merc?.unit_mat_hours
                      ? `${doc.merc.unit_mat_hours}$`
                      : ""}
                  </td>
                  <td align="center">
                    <EditIcon width={20} onClick={()=> handleEditClick(doc)} />
                  </td>
                  <td align="center">
                    <DeleteIcon width={20} onClick={deleteEntry}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        <div className='repair-box__container'>

          <Table className='ant-table-repair' columns={columns} dataSource={filteredEntries} rowClassName = {getRowClassName}/>
          
        </div>
        <p className="total-records">
          Showing <span className="record-range"> 1 - {totalEntries} </span> of{" "}
          <span className="total-range"> {totalEntries} </span>
        </p>
        <div className='bottom-flex'>
      <p className='total-records'>Showing <span className='record-range'> 1 - 5 </span> of <span className='total-range'> {totalEntries} </span></p>
      </div>

      {overlayOpen && (
        <div className="overlay-backdrop"></div>
      )} 

      {selectedEntry && overlayOpen && (
        <div className={`overlay-box ${overlayOpen ? 'overlay-open' : ''}`}>  
          <div className="entry-header">
            <h3>{selectedEntry.uid} - Top Rails and Headers</h3>
            <CloseIcon
              width={15}
              className="close-icon"
              onClick={closeOverlay}
            />
          </div>
          <div className="overlay-header">
            <span
              className={sectionIndex === 0 ? "column-active" : ""}
              onClick={() => handleSectionClick(0, setSectionIndex)}
            >
              Repair Details
            </span>
            <span
              className={sectionIndex === 1 ? "column-active" : ""}
              onClick={() => handleSectionClick(1, setSectionIndex)}
            >
              Non-Maersk Details
            </span>
            <span
              className={sectionIndex === 2 ? "column-active" : ""}
              onClick={() => handleSectionClick(2, setSectionIndex)}
            >
              Merc+ Details
            </span>
          </div>
          <div className="overlay-content">
            {sectionIndex === 0 && (
              <div className="repair-details">
                <div className="repair-details__headings">
                  <p>Repair ID</p>
                  <p>Container Repair Area</p>
                  <p>Container Damaged Area</p>
                  <p>Repair Type</p>
                </div>
                <div className="repair-details__data">
                  <p>{selectedEntry?.uid}</p>
                  <p>{selectedEntry?.rep_area}</p>
                  <p>{selectedEntry?.dmg_area}</p>
                  <p>{selectedEntry?.type}</p>
                </div>
              </div>
            )}
            {sectionIndex === 1 && (
              <div className="non-maersk-details">
                <h5>Non-Maersk Cost Details</h5>
                <div className="non-maersk__cost-details">
                  <div className="non-maersk__cost-details-header">
                    <p>Hours</p>
                    <p>Material Cost</p>
                  </div>
                  <div className="non-maersk__cost-details-content">
                    <p>{selectedEntry?.nmaersk}sample</p>
                    <p>{selectedEntry?.merc?.max_mat_cost}</p>
                  </div>
                </div>
                <h5>Non-Maersk Customer Related Details</h5>
                <div className="non-maersk__customer-details">
                  <div className="non-maersk__customer-details-header">
                    <p>Container Section</p>
                    <p>Damaged Area</p>
                    <p>Repair Type</p>
                    <p>Description</p>
                    <p>COMP</p>
                    <p>DAM</p>
                    <p>REP</p>
                    <p>Component</p>
                    <p>Event</p>
                    <p>Location</p>
                    <p>LGTH/QTY/AREA</p>
                    <p>LGTH/QTY/AREA2</p>
                    <p>ID Source</p>
                  </div>
                  <div className="non-maersk__customer-details-content">
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.type}</p>
                    <p>{selectedEntry?.merc?.desc}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.rep_area}</p>
                    <p>{selectedEntry?.merc?.id}</p>
                  </div>
                </div>
              </div>
            )}
            {sectionIndex === 2 && (
              <div className="merc-plus__details">
                <h5>Merc+ Cost Details</h5>
                <div className="merc-plus__cost-details">
                  <div className="merc-plus__cost-details-header">
                    <p>Max Mat. Cost</p>
                    <p>Unit Mat. Cost</p>
                    <p>Hours Per Unit</p>
                    <p>Max Pieces</p>
                    <p>Units</p>
                  </div>
                  <div className="merc-plus__cost-details-content">
                    <p>{selectedEntry.merc?.max_mat_cost}</p>
                    <p>sample</p>
                    <p>{selectedEntry.merc?.unit_hours}</p>
                    <p>{selectedEntry.merc?.max_pcs}</p>
                    <p>{selectedEntry.merc?.unit}</p>
                  </div>
                </div>
                <h5>Merc+ Customer Related Details</h5>
                <div className="merc-plus-customer__details">
                  <div className="merc-plus-customer__details-header">
                    <p>Repair Mode</p>
                    <p>Mode Number</p>
                    <p>Repair Code</p>
                    <p>Combined</p>
                    <p>Description</p>
                    <p>ID Source</p>
                  </div>
                  <div className="merc-plus-customer__details-content">
                    <p>{selectedEntry.merc?.rep_mode}</p>
                    <p>{selectedEntry.merc?.mode_num}</p>
                    <p>{selectedEntry.merc?.rep_code}</p>
                    <p>{selectedEntry.merc?.combined}</p>
                    <p>{selectedEntry.merc?.desc}</p>
                    <p>{selectedEntry.merc?.id}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairList;
