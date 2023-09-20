import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormikValues } from 'formik'; 
import axiosInstance from '../../../../interceptor/axiosInstance';
import { ApiRoutes } from '../../../../routes/routeConstants/apiRoutes';

interface SectionTwoProps {
  onclose: () => void;
  formik: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
  };
  sectionCompleted: boolean
}

const SectionTwo: React.FC<SectionTwoProps> = ({ onclose, formik, sectionCompleted }) => {

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
const [modeOptions, setModeOptions] = useState([])

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

   useEffect(()=> {
    axiosInstance.get(`${ApiRoutes.REP_CATEGORIES}`)
    .then(response => {
      setModeOptions(response.data.data.values);
    })
    .catch(error => {
      console.error('Error fetching repArea options:', error);
    });
  },[])
  
  return (
    <div className={`merc-plus-form-section ${isCheckboxChecked ? 'disabled' : ''}`}>
      <br></br>
      <input type='checkbox' className='na2-box' onChange={handleCheckboxChange} checked={isCheckboxChecked}/> N/A
      <div>
        <hr></hr>
      </div>
      <br></br>
      <div className='section-three'>
      <h4>Cost Details</h4>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
          <label>Max. Mat. Cost</label>
          <br></br>
          <input
            type="text"
            name="max_mat_cost"
            id="max_mat_cost"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.max_mat_cost}
            placeholder="Enter"
          />
        </div>
        <br></br>
        <div className="input__repair-Area">
          <label>Unit Mat. Cost</label>
          <br></br>
          <input
            type="text"
            name="unit_mat_cost"
            id="unit_mat_cost"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.unit_mat_cost}
            placeholder="0$"
          />
        </div>
      </div>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
          <label>Hours Per Unit</label>
          <br></br>
          <input
            type="text"
            name="unit_hours"
            id="unit_hours"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.unit_hours}
            placeholder="Enter"
          />
        </div>
        <br></br>
        <div className="input__repair-Area">
          <label>Max Pieces</label>
          <br></br>
          <input
            type="text"
            name="max_pcs"
            id="max_pcs"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.max_pcs}
            placeholder="Enter"
          />
        </div>
      </div>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
          <label>Units</label>
          <br></br>
          <input
            type="text"
            name="unit"
            id="unit"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.unit}
            placeholder="Enter"
          />
        </div>
        <br></br>
      </div>
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>
      <h4>Customer Related Details</h4>
      <br></br>
      <div className="repair-details__second-col">
        <div className="input__repair-id container-repair-area">
          <label>Repair Mode</label>
          <br></br>
          <select
            name="rep_mode"
            id="rep_mode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rep_mode}
          >
            <option value="">Select</option>
            <option value="Option 1">1</option>
            <option value="Option 2">2</option>
          </select>
        </div>
        <br></br>
        <div className="input__repair-Area container-repair-area">
          <label>Mode Number</label>
          <br></br>
          <select
            name="mode"
            id="mode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mode}
          >
            <option value="">Select</option>
            {modeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
          <label>Repair Code</label>
          <br></br>
          <input
            type="text"
            name="rep_code"
            id="rep_code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rep_code}
            placeholder="Enter"
          />
        </div>
        <br></br>
        <div className="input__repair-Area">
          <label>Combined</label>
          <br></br>
          <input
            type="text"
            name="combined"
            id="combined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.combined}
            placeholder="Enter"
          />
        </div>
      </div>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
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
        <br></br>
        <div className="input__repair-Area">
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
      </div>
      </div>
      <div className="button-container">
        <Button type="primary" onClick={onclose}>
          Discard
        </Button>
        <button type="submit" className="final-buttons">
          Add Repair
        </button>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default SectionTwo;
