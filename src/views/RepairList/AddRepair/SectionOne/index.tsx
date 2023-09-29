import { Button } from 'antd';
import React, { useState } from 'react';
import { FormikProps, FormikValues } from 'formik';
import 'antd/dist/antd.css'
import CustomInput from '../../../../shared/components/InputField';
import CustomSelect from '../../../../shared/components/SelectField';

interface SectionOneProps {
  onclose: () => void;
  formik: FormikProps<FormikValues>
  onNextSection: () => void;
  sectionCompleted: boolean
}

const SectionOne: React.FC<SectionOneProps> = ({ onclose, formik, onNextSection, sectionCompleted }) => {

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <div>
      <div className="non-maersk-details-section">
        <Checkbox className="no-input-box">&nbsp;&nbsp;N/A</Checkbox>
        <div className="horizontal-line" style={{ marginTop: '20px' }}>
          <hr></hr>
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

          </div>
          <div className="input__repair-Area">
             <CustomSelect
             className='select-choices'
              label="DAM"
              name="dam"
              id="dam"
              placeholder='Enter'
              onBlur={formik.handleBlur}
              value={formik.values.dam}
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="repair-details__second-col">
          <div className="input__repair-id">
          <CustomSelect
          className='select-choices'
              label="REP"
              name="rep"
              id="rep"
              placeholder='Enter'
              onBlur={formik.handleBlur}
              value={formik.values.rep}
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              onChange={formik.handleChange}
            />
          </div>
          <div className="input__repair-Area">
          <CustomSelect
          className='select-choices'
              label="Component"
              name="component"
              id="component"
              placeholder='Enter'
              onBlur={formik.handleBlur}
              value={formik.values.component}
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="repair-details__second-col">
          <div className="input__repair-id">
          <CustomSelect
          className='select-choices'
              label="Event"
              name="event"
              id="event"
              placeholder='Enter'
              onBlur={formik.handleBlur}
              value={formik.values.event}
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              onChange={formik.handleChange}
            />
          </div>
          <div className="repair-details__first-col location-div">
            <div className="input__repair-id">
              <CustomInput id='location' label='Location' name='location' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter' value={formik.values.location}></CustomInput>
            </div>
          </div>
        </div>
        <div className="repair-details__first-col">
          <div className="input__repair-id">
            <CustomInput id='area1' label='LQTH/QTY/AREA' name='area1' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter' value={formik.values.area1}></CustomInput>
          </div>
          <div className="input__repair-id">
            <CustomInput id='area2' label='LQTH/QTY/AREA2' name='area2' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter' value={formik.values.area2}></CustomInput>
          </div>
        </div>
        <div className="repair-details__first-col">
          <div className="input__repair-id id-div">
            <CustomInput id='id' label='ID Source' name='id' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter' value={formik.values.id}></CustomInput>
          </div>
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
