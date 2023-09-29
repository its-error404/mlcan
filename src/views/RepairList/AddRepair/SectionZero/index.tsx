import { Button, Checkbox } from 'antd';
import React from 'react';
import { FormikProps, FormikValues } from 'formik';
import 'antd/dist/antd.css'
import CustomInput from '../../../../shared/components/InputField';
import CustomSelect from '../../../../shared/components/SelectField';

interface SectionOneProps {
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
        <h4>Cost Details</h4>
        <div className="repair-details__first-col">
          <div className="input__repair-id hours-div">
            <CustomInput id='hours' name='hours' onChange={formik.handleChange} onBlur={formik.handleBlur} label='Hours' placeholder='Enter' value={formik.values.hours}></CustomInput>
          </div>
          <div className="input__repair-Area mat-cost-div">
            <CustomInput id='mat_cost' name='mat_cost' onChange={formik.handleChange} onBlur={formik.handleBlur} label='Material Cost' placeholder='Enter' value={formik.values.mat_cost}></CustomInput>
          </div>
        </div>
        <hr></hr>
        <h4>Customer Related Details</h4>
        <div className="repair-details__first-col repaid-id__input">
          <div className="input__repair-id">
            <CustomInput id='cont_sec' name='cont_sec' onChange={formik.handleChange} onBlur={formik.handleBlur} label='Container Section' placeholder='Enter' value={formik.values.cont_sec}></CustomInput>
          </div>
          <div className="input__repair-Area dmg-area-div">
            <CustomInput id='dmg_area' name='dmg_area' onChange={formik.handleChange} onBlur={formik.handleBlur} label='Damaged Area' placeholder='Enter' value={formik.values.dmg_area}></CustomInput>
          </div>
        </div>
        <div className="repair-details__first-col ">
          <div className="input__repair-id repaid-id__input custom-margin">
            <CustomInput id='type' name='type' onChange={formik.handleChange} onBlur={formik.handleBlur} label='Repair Type' placeholder='Enter' value={formik.values.type}></CustomInput>
          </div>
          <div className="input__repair-Area custom-margin">
            <CustomInput id='desc' name='desc' onChange={formik.handleChange} onBlur={formik.handleBlur} label='Description' placeholder='Enter' value={formik.values.desc}></CustomInput>
          </div>
        </div>
        <div className="repair-details__second-col">
          <div className="input__repair-id">

            <CustomSelect
            className='select-choices'
              label="COMP"
              name="comp"
              id="comp"
              placeholder='Enter'
              onBlur={formik.handleBlur}
              value={formik.values.comp}
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              onChange={formik.handleChange}
            />

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
            name="dmg_area"
            id="dmg_area"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dmgArea}
          >
            <option value="">Select</option>
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
            <option value="">Select</option>
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
      <div className="button-container add-repair-buttons">
        <Button type="primary" onClick={onclose}>
          Discard
        </Button>
        <Button type="primary" onClick={onNextSection}>Proceed</Button>
      </div>
    </div>
  );
};

export default SectionOne;
