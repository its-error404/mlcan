import React from "react";
import "./Containers.scss";
import Sidebar from "../../shared/components/Sidebar/index";
import { ReactComponent as PlusIcon } from "../../assets/single color icons - SVG/add.svg";
import {ReactComponent as SearchIcon} from '../../assets/single color icons - SVG/search.svg'
import {ReactComponent as FilterIcon} from '../../assets/single color icons - SVG/filter.svg'
import { Button } from "antd";

const AllContainers = () => {
  return (

    <div className="main">

      <div className="all-containers">
          
          <Sidebar />
          <div className="containers-section">
            
            <div className="containers-header">
              <h1>Containers</h1>
              <PlusIcon width={25} className="plus-icon"/>
            </div>

            <div className="options">
              <p>All</p>
              <p>Draft</p>
              <p>Admin Review Pending</p>
              <p>Pending Customer Approval</p>
              <p>Quotes Approved by Customers</p>
            </div>

            <div className="container-details">

              <div className="search-container">
                <span className="search-icon"><SearchIcon width={17}/></span>
                <input type="text" className="search-box" placeholder="Search container by number"></input>
                <div className="filters-container">
                  <Button className="filter-button"><span className="filter-icon"><FilterIcon width={20}/></span>Filters</Button>
                  <div className="filter-menu">
                      <div className="filter-menu__header">
                          <div className="filter-menu__filters">
                            <h3>Filters</h3>
                          </div>
                          <div className="filter-menu__options">
                            <p>Reset</p>
                            <p>Apply</p>
                          </div>
                      </div>

                      <div className="filter-menu__selections">

                          <div className="date-option">
                            <label htmlFor="">Date</label>
                            <select>
                              <option>Select Date</option>
                            </select>
                          </div>

                          <div className="date-option">
                            <label htmlFor="">Activity</label>
                            <select>
                              <option>Select</option>
                            </select>
                          </div>

                          <div className="date-option">
                            <label htmlFor="">Status</label>
                            <select>
                              <option>Select</option>
                            </select>
                          </div>

                          <div className="date-option">
                            <label htmlFor="">Yard</label>
                            <select>
                              <option>Select</option>
                            </select>
                          </div>

                          <div className="date-option">
                            <label htmlFor="">Customer</label>
                            <select>
                              <option>Select</option>
                            </select>
                          </div>
                          
                      </div>
                  </div>
                </div>
              </div>

              <div className="container-box__header">
                <table>
                  <thead>
                    <tr>
                      <th>Container Number</th>
                      <th>Yard</th>
                      <th>Customer</th>
                      <th>Owner Name</th>
                      <th>Current Activity</th>
                      <th>Satus</th>
                    </tr>  
                  </thead>  
                </table>
              </div>

            </div>

          </div>

        </div>

      </div>
  );
};

export default AllContainers;
