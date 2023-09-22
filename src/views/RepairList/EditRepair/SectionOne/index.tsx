import { Button } from 'antd';
import React, { useState } from 'react';
import { FormikProps, FormikValues } from 'formik';

interface SectionOneProps {
  onclose: () => void;
  formik: FormikProps<FormikValues>
  onNextSection: () => void;
  sectionCompleted: boolean
}

const SectionOne: React.FC<SectionOneProps> = ({ onclose, onNextSection, formik, sectionCompleted }) => {

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

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
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
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
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
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
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
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
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
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
              <option value="">Select</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
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
