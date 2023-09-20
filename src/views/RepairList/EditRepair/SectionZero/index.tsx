import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormikPropsSectionZero } from '../../../../shared/types/formikTypes';
import '../../AddRepair/AddRepair.scss'
import 'antd/dist/antd.css';
import axiosInstance from '../../../../interceptor/axiosInstance';
import { ApiRoutes } from '../../../../routes/routeConstants/apiRoutes';

interface SectionZeroProps {
  onclose: () => void;
  formik: FormikPropsSectionZero
  onNextSection: () => void;
  sectionCompleted: boolean
}

const SectionZero: React.FC<SectionZeroProps> = ({ onclose, formik, onNextSection, sectionCompleted }) => {

  const [repAreaOptions, setRepAreaOptions] = useState<string[]>([]);
  const [dmgAreaOptions, setDmgAreaOptions] = useState<string[]>([]);
  const [repairTypeOptions, setRepairTypeOptions] = useState<string[]>([]);

  useEffect(()=> {

    axiosInstance.get(`${ApiRoutes.DMG_AREAS}`)
      .then(response => {
        setDmgAreaOptions(response.data.data.values);
      })
      .catch(error => {
        console.error('Error fetching repArea options:', error);
      });

      axiosInstance.get(`${ApiRoutes.REP_AREAS}`)
        .then(response => {
           setRepAreaOptions(response.data.data.values);
         })
         .catch(error => {
          console.error('Error fetching repArea options:', error);
         });

         axiosInstance.get(`${ApiRoutes.REP_TYPES}`)
         .then(response => {
             setRepairTypeOptions(response.data.data.values);
           })
           .catch(error => {
            console.error('Error fetching repArea options:', error);
           });
  },[])

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
            name="repArea"
            id="repArea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repArea}
            className="select-choices"
          >
            {repAreaOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
            name="dmgArea"
            id="dmgArea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dmgArea}
          >
            {dmgAreaOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
            {repairTypeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formik.touched.type && formik.errors.type ? (
            <div className="field-4-error-message">{formik.errors.type}</div>
          ) : null}
        </div>
        <br></br>
      </div>
      <div className="button-container edit-buttons">
        <Button type="primary" onClick={onclose}>
          Discard
        </Button>
        <Button type="primary" onClick={onNextSection}>Proceed</Button>
      </div>
    </div>
  );
};

export default SectionZero;
