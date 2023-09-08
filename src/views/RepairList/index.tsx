import React, { useState } from 'react'
import './RepairList.scss'
import Sidebar from '../../shared/components/Sidebar/index'
import { ReactComponent as PlusIcon } from '../../assets/single color icons - SVG/add.svg'
import { ReactComponent as SearchIcon } from '../../assets/single color icons - SVG/search.svg'
import { ReactComponent as FilterIcon } from '../../assets/single color icons - SVG/filter.svg'
import { Button } from 'antd'
import { ReactComponent as ToggleIcon } from '../../assets/Multicolor icons - SVG/sort default.svg'
import { ReactComponent as EditIcon } from '../../assets/single color icons - SVG/edit.svg'
import { ReactComponent as DeleteIcon } from '../../assets/single color icons - SVG/delete.svg'
import { ReactComponent as ExportIcon } from '../../assets/single color icons - SVG/export.svg'
import { ReactComponent as VersionIcon } from '../../assets/single color icons - SVG/version.svg'
import { ReactComponent as DownIcon } from '../../assets/single color icons - SVG/accordion open.svg'
import { useFetchData, useRowClick, useSectionClick } from '../../services/RepairListService/repairlist.service'

const RepairList = () => {
  const [searchData, setSearchData] = useState('')
  const { repairListData, totalEntries } = useFetchData()
  const { selectedEntry, handleRowClick } = useRowClick();
  const handleSectionClick = useSectionClick()
  const [sectionIndex, setSectionIndex] = useState<number>(0)

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
            value={searchData}
          ></input>
          <Button className="filter-button"><span className="repair-first-icon"><FilterIcon width={20} /></span>Filters</Button>
          <Button className="filter-button"><span className="repair-filter-icon"><ExportIcon width={20} /></span>Export</Button>
          <Button className="version-button"><span className="repair-filter-icon"><VersionIcon width={20} /></span>Version 1 - 22 Aug 2020<span className='down-icon'><DownIcon width={10} /></span></Button>
          <Button className="bulk-upload-button">Bulk Upload</Button>
        </div>

        <div className='repair-box__container'>
          <table className='repair-box__table'>
          <thead>
            <tr className='repair-box__rows'>
              <th>Repair ID<span><ToggleIcon width={8} /></span></th>
              <th>Repair Area<span><ToggleIcon width={8} /></span></th>
              <th>Damaged Area<span><ToggleIcon width={8} /></span></th>
              <th>Type<span><ToggleIcon width={8} /></span></th>
              <th>Non-Maersk<br />&emsp;&emsp;&emsp;hours</th>
              <th>Non-Maersk <br />&emsp;&emsp;mat.cost</th>
              <th>&emsp;&emsp;Merc+ <br />hours/unit</th>
              <th>&emsp;&emsp;&emsp;Merc+ <br />mat.cost/unit</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {repairListData?.data?.docs.map((doc, index) => (
              <tr  className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.uid} onClick={() => handleRowClick(doc)}>
                <td>{doc.uid}</td>
                <td>{doc.rep_area}</td>
                <td>{doc.dmg_area}</td>
                <td>{doc.type}</td>
                <td>{doc.nmaersk}</td>
                <td>{doc.merc?.max_mat_cost}</td>
                <td>{doc.merc?.unit_hours}</td>
                <td>{doc.merc?.unit_mat_hours}</td>
                <td><EditIcon width={20} /></td>
                <td><DeleteIcon width={20} /></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <p className='total-records'>Showing <span className='record-range'> 1 - 5 </span> of <span className='total-range'> {totalEntries} </span></p>
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
