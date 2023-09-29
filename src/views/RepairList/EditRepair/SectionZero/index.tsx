import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormikProps, FormikValues } from 'formik';
import 'antd/dist/antd.css'
import CustomInput from '../../../../shared/components/InputField';
import CustomSelect from '../../../../shared/components/SelectField';
import axiosInstance from '../../../../interceptor/axiosInstance';
import { ApiRoutes } from '../../../../routes/routeConstants/apiRoutes';

interface SectionZeroProps {
  onclose: () => void;
  formik: FormikProps<FormikValues>
  onNextSection: () => void;
  sectionCompleted: boolean
}

const SectionZero: React.FC<SectionZeroProps> = ({ onclose, formik, onNextSection, sectionCompleted }) => {

  const [repAreaOptions, setRepAreaOptions] = useState<string[]>([]);
  const [dmgAreaOptions, setDmgAreaOptions] = useState<string[]>([]);
  const [repairTypeOptions, setRepairTypeOptions] = useState<string[]>([]);
  const [dataFetched, setDataFetched] = useState({
    repAreas: false,
    dmgAreas: false,
    repairTypes: false,
  });
  
  useEffect(() => {
    if (!dataFetched.repAreas) {
      axiosInstance.get(ApiRoutes.REP_AREAS)
        .then(response => {
          setRepAreaOptions(response.data.data.values);
          setDataFetched(prevState => ({
            ...prevState,
            repAreas: true,
          }));
        })
        .catch(error => {
          console.error('Error fetching repArea options:', error);
        });
    }
  
    if (!dataFetched.dmgAreas) {
      axiosInstance.get(ApiRoutes.DMG_AREAS)
        .then(response => {
          setDmgAreaOptions(response.data.data.values);
          setDataFetched(prevState => ({
            ...prevState,
            dmgAreas: true,
          }));
        })
        .catch(error => {
          console.error('Error fetching dmgArea options:', error);
        });
    }
  
    if (!dataFetched.repairTypes) {
      axiosInstance.get(ApiRoutes.REP_TYPES)
        .then(response => {
          setRepairTypeOptions(response.data.data.values);
          setDataFetched(prevState => ({
            ...prevState,
            repairTypes: true,
          }));
        })
        .catch(error => {
          console.error('Error fetching repairType options:', error);
        });
    }
  }, [dataFetched]);
  
  return (
    <div>
      <div className="repair-details__first-col">

        <div className="field-1 input__repair-id repaid-id__input">

          <CustomInput id='uid' name='uid' label='Repair ID' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter' value={formik.values.uid} />
          {formik.touched.uid && formik.errors.uid ? (<div className="field-1-error-message">{formik.errors.uid}</div>) : null}

        </div>

        <hr></hr>


        <div className="container-damaged-area field-2 container-repair-area">

          <CustomSelect
            className='select-choices'
            label="Repair Area"
            name="repArea"
            id="repArea"
            placeholder='Enter'
            onBlur={formik.handleBlur}
            value={formik.values.repArea}
            onChange={formik.handleChange}
            options={repAreaOptions.map((option) => (
              { label: option, value: option }
            ))}
          >
            <option value="">Select</option>
            {repAreaOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CustomSelect>
          {formik.touched.repArea && formik.errors.repArea ? (
            <div className="field-2-error-message">{formik.errors.repArea}</div>
          ) : null}
        </div>


      </div>

      <div className="repair-details__second-col ">
        <div className="input__repair-id field-3 container-repair-area">

          <CustomSelect
            className='select-choices'
            label="Container Damaged Area"
            name="dmgArea"
            id="dmgArea"
            placeholder='Enter'
            onBlur={formik.handleBlur}
            value={formik.values.dmgArea}
            onChange={formik.handleChange}
            options={dmgAreaOptions.map((option) => (
              { label: option, value: option }
            ))}
          >
            <option value="">Select</option>
            {repAreaOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CustomSelect>
          {formik.touched.dmgArea && formik.errors.dmgArea ? (<div className="field-3-error-message">{formik.errors.dmgArea}</div>) : null}
        </div>

        <div className="input__repair-Area container-repair-area">

          <CustomSelect
            className='select-choices'
            label="Repair Type"
            name="type"
            id="type"
            placeholder='Enter'
            onBlur={formik.handleBlur}
            value={formik.values.type}
            onChange={formik.handleChange}
            options={repairTypeOptions.map((option) => (
              { label: option, value: option }
            ))}
          >
            <option value="">Select</option>
            {repairTypeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CustomSelect>
          {formik.touched.type && formik.errors.type ? (<div className="field-4-error-message">{formik.errors.type}</div>) : null}
        </div>


      </div>
      <div className="button-container add-repair-buttons">
        <Button type="primary" onClick={onclose}>
          Discard
        </Button>
        <Button type="primary" onClick={onNextSection}>Proceed</Button>
      </div>
    </div>
  );
};

export default SectionZero;
