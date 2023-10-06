import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
import "antd/dist/antd.css";

const FilterMenu = ({
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
  return (
    <div className={`filter-menu repair-list-filters container-filter-menu ${filterMenu ? "visible" : "invisible"}`} onClick={(e) => e.stopPropagation()}>
      <div className="filter-header__first-part">
        <h4>Filters</h4>
      </div>
      <div className="filter-header__second-part">
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
              onChange={(date, dateString) => setDateData(dateString)}
              value={dateData !== "" ? moment(dateData, "DD MMM YYYY") : null}
              format="DD MMM YYYY"
            />
          </div>
          <div className="filter-dropdown-date choose-activity">
            <label>Activity</label>
            <select
              value={activityData}
              onChange={(e) => setActivityData(e.target.value)}
            >
              <option>draft</option>
              <option>inspection</option>
            </select>
          </div>
        </div>

        <div className="column-2">
          <div className="filter-dropdown-date">
            <label>Status</label>
            <select
              value={statusData}
              onChange={(e) => setStatusData(e.target.value)}
            >
              <option>billing</option>
              <option>draft</option>
            </select>
          </div>

          <div className="filter-dropdown-date option-yard">
            <label>Yard</label>
            <select
              value={yardData}
              onChange={(e) => setYardData(e.target.value)}
            >
              <option>Nordel</option>
              <option>Harbourlink</option>
              <option>Aheer</option>
            </select>
          </div>
        </div>

        <div className="filter-dropdown-date">
          <label>Customer</label>
          <select
            value={customerData}
            onChange={(e) => setCustomerData(e.target.value)}
          >
            <option>Krishna</option>
            <option>Killian Darian</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
