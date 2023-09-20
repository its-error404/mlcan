import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormikProps, FormikValues } from 'formik';
import axiosInstance from '../../../../interceptor/axiosInstance';
import { ApiRoutes } from '../../../../routes/routeConstants/apiRoutes';

interface SectionOneProps {
  onclose: () => void;
  formik: FormikProps<FormikValues>
  onNextSection: () => void;
  sectionCompleted: boolean
}

const SectionOne: React.FC<SectionOneProps> = ({ onclose, onNextSection, formik, sectionCompleted }) => {

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [compOptions, setCompOptions] = useState<string[]>([]);
  const [damOptions, setDamOptions] = useState<string[]>([]);
  const [repOptions, setRepOptions] = useState<string[]>([]);
  const [componentOptions, setComponentOptions] = useState<string[]>([]);
  const [eventOptions, setEventOptions] = useState<string[]>([]);

  useEffect(()=> {
    axiosInstance.get(`${ApiRoutes.COMP_OPTIONS}`)
    .then(response => {
      setCompOptions(response.data.data.values);
    })
    .catch(error => {
      console.error('Error fetching repArea options:', error);
    });
    axiosInstance.get(`${ApiRoutes.DAM_OPTIONS}`)
    .then(response => {
      setDamOptions(response.data.data.values);
    })
    .catch(error => {
      console.error('Error fetching repArea options:', error);
    });
    axiosInstance.get(`${ApiRoutes.REP_OPTIONS}`)
    .then(response => {
      setRepOptions(response.data.data.values);
    })
    .catch(error => {
      console.error('Error fetching repArea options:', error);
    });
    axiosInstance.get(`${ApiRoutes.COMPONENT_OPTIONS}`)
    .then(response => {
      setComponentOptions(response.data.data.values);
    })
    .catch(error => {
      console.error('Error fetching repArea options:', error);
    });
    axiosInstance.get(`${ApiRoutes.EVENT_OPTIONS}`)
    .then(response => {
      setEventOptions(response.data.data.values);
    })
    .catch(error => {
      console.error('Error fetching repArea options:', error);
    });
  },[])


  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <div className={`section-two ${isCheckboxChecked ? 'disabled' : ''}`}>
      <input type='checkbox' className='na1-box' onChange={handleCheckboxChange} checked={isCheckboxChecked}/> N/A
      <div className={`Non-maersk-details-section ${isCheckboxChecked ? 'disabled' : ''}`}>
        <div className="horizontal-line">
          <hr></hr>
        </div>
        <br></br>
        <h4>Cost Details</h4>
        <div className="repair-details__first-col cost-details">
          <div className="input__repair-id">
            <label>Hours</label>
            <br></br>
            <input
              type="text"
              name="hours"
              id="hours"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hours}
              placeholder="Enter"
            />
          </div>
          <br></br>
          <div className="input__repair-Area">
            <label>Material Cost</label>
            <br></br>
            <input
              type="text"
              name="mat_cost"
              id="mat_cost"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mat_cost}
              placeholder="0$"
            />
          </div>
        </div>
        <hr></hr>
        <h4 className='customer-rel'>Customer Related Details</h4>
        <div className="repair-details__first-col repaid-id__input">
          <div className="input__repair-id">
            <label>Container Section</label>
            <br></br>
            <input
              type="text"
              name="cont_sec"
              id="cont_sec"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cont_sec}
            />
          </div>
          <br></br>
          <div className="input__repair-Area">
            <label>Damaged Area</label>
            <br></br>
            <input
              type="text"
              name="dmg_area"
              id="dmg_area"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dmg_area}
            />
          </div>
        </div>
        <div className="repair-details__first-col ">
          <div className="input__repair-id repaid-id__input custom-margin">
            <label>Repair Type</label>
            <br></br>
            <input
              type="text"
              name="type"
              id="type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            />
          </div>
          <br></br>
          <div className="input__repair-Area">
            <label>Description</label>
            <br></br>
            <input
              type="text"
              name="desc"
              id="desc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.desc}
              placeholder="Enter"
            />
          </div>
        </div>
        <br></br>
        <div className="repair-details__second-col container-repair-area">
          <div className="input__repair-id">
            <label>COMP</label>
            <br></br>
            <select
              name="COMP"
              id="COMP"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.COMP}
            >
               {compOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            </select>
          </div>
          <br></br>
          <div className="input__repair-Area">
            <label>DAM</label>
            <br></br>
            <select
              name="DAM"
              id="DAM"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.DAM}
            >
              {damOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            </select>
          </div>
        </div>
        <br></br>
        <div className="repair-details__second-col container-repair-area">
          <div className="input__repair-id">
            <label>REP</label>
            <br></br>
            <select
              name="REP"
              id="REP"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.REP}
            >
               {repOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            </select>
          </div>
          <br></br>
          <div className="input__repair-Area">
            <label>Component</label>
            <br></br>
            <select
              name="component"
              id="component"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.component}
            >
               {componentOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            </select>
          </div>
        </div>
        <br></br>
        <div className="repair-details__second-col container-repair-area">
          <div className="input__repair-id">
            <label>Event</label>
            <br></br>
            <select
              name="event"
              id="event"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.event}
            >
               {eventOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            </select>
          </div>
          <br></br>
          <div className="repair-details__first-col">
          <div className="input__repair-id location-div">
            <label>Location</label>
            <br></br>
            <input
              type="text"
              name="location"
              id="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              placeholder="Enter"
            />
          </div>
            <br></br>
          </div>

          <br></br>
        </div>
        <div className="repair-details__first-col">
          <div className="input__repair-id">
            <label>LQTH/QTY/AREA</label>
            <br></br>
            <input
              type="text"
              name="area1"
              id="area1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.area1}
              placeholder="Enter"
            />
          </div>
          <br></br>
          <div className="input__repair-id">
            <label>LQTH/QTY/AREA2</label>
            <br></br>
            <input
              type="text"
              name="area2"
              id="area2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.area2}
              placeholder="Enter"
            />
          </div>
          <br></br>
        </div>
        <div className="repair-details__first-col">
          <div className="input__repair-id">
            <label>ID Source</label>
            <br></br>
            <input
              type="text"
              name="id"
              id="id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
              placeholder="Enter"
            />
          </div>
          <br></br>
          <br></br>
        </div>
        <br></br>
      </div>
      <div className="button-container">
          <Button type="primary" onClick={onclose}>
            Discard
          </Button>
          <Button type="primary" onClick={onNextSection}>Proceed</Button>
        </div>
    </div>
  );
};

export default SectionOne;
