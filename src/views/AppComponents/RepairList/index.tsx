import React, { useEffect, useState } from 'react'
import './RepairList.scss'
import Sidebar from '../../../shared/components/Sidebar'
import axiosInstance from '../../../interceptor/axiosInstance'
import { ApiRoutes } from '../../../routes/routeConstants/apiRoutes'
import { ReactComponent as PlusIcon } from '../../../assets/single color icons - SVG/add.svg'
import { ReactComponent as SearchIcon } from '../../../assets/single color icons - SVG/search.svg'
import { ReactComponent as FilterIcon } from '../../../assets/single color icons - SVG/filter.svg'
import { Button } from 'antd'

export interface Repair {
  uid: string;
  category: string;
  created_at: string;
  deleted: boolean;
  dmg_area: string;
  id: string;
  merc: {
    max_mat_cost: number;
    unit_mat_hours: number;
    unit_hours: number;
    max_pcs: number;
    unit: string;
    
  };
  nmaersk: any; 
  rep_area: string;
  type: string;
  updated_at: string;
}

export interface Data {
  data: {
    docs: Repair[]
  }
}

const RepairList = () => {
  const [data, setData] = useState<Data | null> (null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(ApiRoutes.ALL_REPAIRS)
        setData(response.data)
        console.log(data)
        // console.log(response.data.data.docs)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
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
          ></input>
        </div>
        <div className="repair-box__header">
              <div className='repair-id__content'>
                <h4 className='repair-id__header'>Repair ID</h4>
                {data?.data?.docs.map((doc, index) => (
                    <p className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.uid}>{doc.uid}</p>
                ))}
              </div>
              <div className='repair-id__content'>
                <h4 className='repair-id__header'>Repair Area</h4>
                {data?.data?.docs.map((doc, index) => (
                    <p className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.rep_area}>{doc.rep_area}</p>
                ))}
              </div>
              <div className='repair-id__content'>
                <h4 className='repair-id__header'>Damaged Area</h4>
                {data?.data?.docs.map((doc, index) => (
                    <p className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.dmg_area}>{doc.dmg_area}</p>
                ))}
              </div>
              <div className='repair-id__content'>
                <h4 className='repair-id__header'>Type</h4>
                {data?.data?.docs.map((doc, index) => (
                    <p className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.type}>{doc.type}</p>
                ))}
              </div>
              <div className='repair-id__content'>
                <h4 className='repair-id__header'>Non-Maersk Hours</h4>
                {data?.data?.docs.map((doc, index) => (
                    <p className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.nmaersk}>{doc.nmaersk}</p>
                ))}
              </div>
              <div className='repair-id__content'>
                <h4 className='repair-id__header'>Non-Maersk mat.cost</h4>
                {data?.data?.docs.map((doc, index) => (
                    <p className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.merc?.max_mat_cost}>{doc.merc?.max_mat_cost}</p>
                ))}
              </div>
              <div className='repair-id__content'>
                <h4 className='repair-id__header'>Merc+hours/unit</h4>
                {data?.data?.docs.map((doc, index) => (
                    <p className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.merc?.unit_hours}>{doc.merc?.unit_hours}</p>
                ))}
              </div>
              <div className='repair-id__content'>
                <h4 className='repair-id__header'>Merc+mat.cost/unit</h4>
                {data?.data?.docs.map((doc, index) => (
                    <p className={index % 2 === 0 ? 'repair-id__even' : 'repair-id__odd'} key={doc.merc?.unit_mat_hours}>{doc.merc?.unit_mat_hours}</p>
                ))}
              </div>
        </div>
      </div>
    </div>
  )
}

export default RepairList
