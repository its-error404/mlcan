import React, { useState, useEffect } from 'react'
import './RepairList.scss'
import Sidebar from '../../shared/components/Sidebar/index'
import { ReactComponent as PlusIcon } from '../../assets/single color icons - SVG/add.svg'
import { ReactComponent as SearchIcon } from '../../assets/single color icons - SVG/search.svg'
import { ReactComponent as FilterIcon } from '../../assets/single color icons - SVG/filter.svg'
import { Button, Table } from 'antd'
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

    <div className='repair-list'>
      
      <Sidebar />
      
      <div className='repairs-section'>
        <div className='repairs-header'>
          <h1>Repair List</h1>
          <PlusIcon width={25} className='plus-icon' />
        </div>
        <div className='repair-search-container'>
          <span className='search-icon'>
            <SearchIcon width={17} />
          </span>
          <input
            type='text'
            className='search-box'
            placeholder='Search by repair id'
            onChange={(e) => setSearchData(e.target.value)}
          ></input>
          <Button className="filter-button"><span className="repair-first-icon"><FilterIcon width={20} /></span>Filters</Button>
          <Button className="filter-button"><span className="repair-filter-icon"><ExportIcon width={20} /></span>Export</Button>
          <Button className="version-button"><span className="repair-filter-icon"><VersionIcon width={20} /></span>Version 1 - 22 Aug 2020<span className='down-icon'><DownIcon width={10} /></span></Button>
          <Button className="bulk-upload-button">Bulk Upload</Button>
        </div>

        <div className='repair-box__container'>

          <Table className='ant-table-repair' columns={columns} dataSource={filteredEntries} rowClassName = {getRowClassName}/>
          
        </div>
        <div className='bottom-flex'>
      <p className='total-records'>Showing <span className='record-range'> 1 - 5 </span> of <span className='total-range'> {totalEntries} </span></p>
      </div>
       
      </div>
      {selectedEntry && (
        <div className="overlay-box">
          <div className="overlay-header">
            <span className={sectionIndex === 0 ? 'active' : ''} onClick={() => handleSectionClick(0, setSectionIndex)}>
              Section 1
            </span>
            <span className={sectionIndex === 1 ? 'active' : ''} onClick={() => handleSectionClick(1, setSectionIndex)}>
              Section 2
            </span>
            <span className={sectionIndex === 2 ? 'active' : ''} onClick={() => handleSectionClick(2, setSectionIndex)}>
              Section 3
            </span>
          </div>
          <div className="overlay-content">
            {sectionIndex === 0 && (
              <div className="section1">
                
                <h2>Section 1</h2>
                
              </div>
            )}
            {sectionIndex === 1 && (
              <div className="section2">
               
                <h2>Section 2</h2>
                
              </div>
            )}
            {sectionIndex === 2 && (
              <div className="section3">
               
                <h2>Section 3</h2>
                
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairList
