import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import '../../../views/Containers/Containers.scss'
import { fetchEditContainerMeta } from "../../../services/ContainersService/containers.service";

interface FilterMenuProps {
  filterMenu?: boolean;
  setFilterMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  setDateData?:React.Dispatch<React.SetStateAction<string>>;
  dateData?:string;
  setActivityData:React.Dispatch<React.SetStateAction<string>>;
  activityData?:string;
  setStatusData?:React.Dispatch<React.SetStateAction<string>>;
  yardData?:string
  statusData?:string
  setYardData?:React.Dispatch<React.SetStateAction<string>>;
  setCustomerData?:React.Dispatch<React.SetStateAction<string>>;
  customerData:string
  handleResetFilters: () => void
  handleApplyFilters: () => void
}

const FilterMenu:React.FC<FilterMenuProps> = ({
  filterMenu,
  setFilterMenu,
  setDateData,
  dateData,
  setActivityData,
  activityData,
  setStatusData,
  statusData,
  setYardData,
  yardData,
  setCustomerData,
  customerData,
  handleResetFilters,
  handleApplyFilters,
}) => {
const handleDateChange = (date: Dayjs | null, dateString: string) => {
  if (date !== null) {
    if(setDateData){
    setDateData(date.format('DD MMM YYYY'));
    }
  } else {
    if(setDateData){
    setDateData('');
    }
  }
};
const [activityOptions, setActivityOptions] = useState<string[]>([])
const [yardOptions, setYardOptions] = useState<string[]>([])
const [customers, setCustomers] = useState<string[]>([])

useEffect(()=>{
  const fetchOptions = async () => {
    try {
      const { activityStatusData, contYardsData, customerNames } = await fetchEditContainerMeta()
      setActivityOptions(activityStatusData)
      setYardOptions(contYardsData)
      setCustomers(customerNames)
    }catch (err) {console.log(err)}
  }
fetchOptions()
},[])



  return (
    <div className={`filter-menu repair-list-filters container-filter-menu ${filterMenu ? "visible" : "invisible"}`} onClick={(e) => e.stopPropagation()}>
      <div className="filter-header__first-part">
        <h4>Filters</h4>
      </div>
      <div className="filter-header__second-part container-filter-second-part">
        <h4
          onClick={(e) => {
            e.stopPropagation();
            handleResetFilters();
          }}
        >
          Reset
        </h4>
        <h4
          onClick={(e) => {
            e.stopPropagation();
            handleApplyFilters();
          }}
        >
          Apply
        </h4>
      </div>

      <div className="filter-options-containers">
        <div className="column-1">
          <label style={{ width: "40px" }}>Date</label>
          <div className="container-date-box filter-date">
      <DatePicker
        className="container-date-picker"
        onChange={handleDateChange}
        value={dateData !== "" ? dayjs(dateData, "DD MMM YYYY") : null}
        format="DD MMM YYYY"
      />
    </div>
          <div className="filter-dropdown-date choose-activity">
            <label>Activity</label>
            <select
              value={activityData}
              onChange={(e) => setActivityData(e.target.value)}>
              <option value=''>Select</option>
                {activityOptions.map(option => (
                  <option key={option} value={option} className="capitalize-options">
                    {option}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="column-2">
          <div className="filter-dropdown-date">
            <label>Status</label>
            <select
              value={statusData}
              onChange={(e) => setStatusData?.(e.target.value)}
            >
              <option value=''>Select</option>
                {activityOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>

          <div className="filter-dropdown-date option-yard">
            <label>Yard</label>
            <select
              value={yardData}
              onChange={(e) => setYardData?.(e.target.value)}
            >
             <option value=''>Select</option>
                {yardOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="filter-dropdown-date">
          <label>Customer</label>
          <select
            value={customerData}
            onChange={(e) => setCustomerData?.(e.target.value)}
          >
           <option value=''>Select</option>
                {customers.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
