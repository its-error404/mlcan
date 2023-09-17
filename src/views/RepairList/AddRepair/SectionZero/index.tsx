import { Button } from 'antd';
import React from 'react';
import { FormikPropsSectionZero } from '../../../../shared/types/formikTypes';
import '../AddRepair.scss'

interface SectionZeroProps {
  onclose: () => void;
  formik: FormikPropsSectionZero
}

const SectionZero: React.FC<SectionZeroProps> = ({ onclose, formik }) => {
  return (
    <div className='first-column'>
      <div className="repair-details__first-col">
        <div className="field-1 input__repair-id repaid-id__input">
          <label>Repair ID</label>
          <br></br>
          <input
            type="text"
            name="uid"
            id="uid"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.uid}
          />
          {formik.touched.uid && formik.errors.uid ? (
            <div className="field-1-error-message">{formik.errors.uid}</div>
          ) : null}
        </div>

        <br></br>

        <div className="container-damaged-area field-2 container-repair-area">
          <label>Container Repair Area</label>
          <br></br>
          <select
            name="rep_area"
            id="rep_area"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repArea}
            className="select-choices"
          >
            <option value="" className="default-select">
              Select
            </option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
          </select>
          {formik.touched.repArea && formik.errors.repArea ? (
            <div className="field-2-error-message">{formik.errors.repArea}</div>
          ) : null}
        </div>

        <br></br>
      </div>
      <br></br>
      <div className="repair-details__second-col ">
        <div className="input__repair-id field-3 container-repair-area">
          <label>Container Damaged Area</label>
          <br></br>
          <select
            name="dmg_area"
            id="dmg_area"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dmgArea}
          >
            <option value="">Select</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
          </select>
          {formik.touched.dmgArea && formik.errors.dmgArea ? (
            <div className="field-3-error-message">{formik.errors.dmgArea}</div>
          ) : null}
        </div>
        <br></br>
        <div className="input__repair-Area container-repair-area">
          <label>Repair Type</label>
          <br></br>
          <select
            name="type"
            id="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
          >
            <option value="">Select</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
          </select>
          {formik.touched.type && formik.errors.type ? (
            <div className="field-4-error-message">{formik.errors.type}</div>
          ) : null}
        </div>
        <br></br>
      </div>
      <div className="button-container">
        <Button type="primary" onClick={onclose}>
          Discard
        </Button>
        <Button type="primary">Proceed</Button>
      </div>
    </div>
  );
};

export default SectionZero;
