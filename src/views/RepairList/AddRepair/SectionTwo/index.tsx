import { Button, Checkbox } from 'antd';
import React from 'react';
import { FormikValues } from 'formik'; 
import CustomInput from '../../../../shared/components/InputField';
import CustomSelect from '../../../../shared/components/SelectField';

interface SectionTwoProps {
  onclose: () => void;
  formik: {
    values: FormikValues;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
  };
}

const SectionTwo: React.FC<SectionTwoProps> = ({ onclose, formik }) => {
  return (
    <div className="merc-plus-form-section">
      <Checkbox className="no-input-box">&nbsp;&nbsp;N/A</Checkbox>
      <div style={{marginTop: '20px'}}>
        <hr></hr>
      </div>
      <h4>Cost Details</h4>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
           <CustomInput name='max_mat_cost' id='max_mat_cost' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.max_mat_cost} label='Max. Mat. Cost' placeholder='Enter'></CustomInput>
        </div>
        <div className="input__repair-Area">
           <CustomInput name='unit_mat_cost' id='unit_mat_cost' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.unit_mat_cost} label='Unit. Mat. Cost' placeholder='Enter'></CustomInput>
        </div>
      </div>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
           <CustomInput name='unit_hours' id='unit_hours' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.unit_hours} label='Hours Per Unit' placeholder='Enter'></CustomInput>
        </div>
        <div className="input__repair-Area">
           <CustomInput name='max_pcs' id='max_pcs' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.max_pcs} label='Max Pieces' placeholder='Enter'></CustomInput>
        </div>
      </div>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
           <CustomInput name='unit' id='unit' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.unit} label='Units' placeholder='Enter'></CustomInput>
        </div>
      </div>
      <hr style={{marginTop: '30px'}}></hr>
      <h4>Customer Related Details</h4>
      <div className="repair-details__second-col">
        <div className="input__repair-id">
          <CustomSelect
          className='select-choices'
              label="Repair Mode"
              name="rep_mode"
              id="rep_mode"
              placeholder='Select'
              onBlur={formik.handleBlur}
              value={formik.values.rep_mode}
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
              label="Mode Number"
              name="mode"
              id="mode"
              placeholder='Select'
              onBlur={formik.handleBlur}
              value={formik.values.mode}
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              onChange={formik.handleChange}
            />
        </div>
      </div>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
          <CustomSelect
          className='select-choices'
              label="Repair Code"
              name="rep_code"
              id="rep_code"
              placeholder='Select'
              onBlur={formik.handleBlur}
              value={formik.values.rep_code}
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              onChange={formik.handleChange}
            />
        </div>
        <div className="input__repair-Area">
          <CustomInput name='comb' id='comb' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.comb} label='Combined' placeholder='Enter'></CustomInput>
        </div>
      </div>
      <div className="repair-details__first-col">
        <div className="input__repair-id">
          <CustomInput name='desc' id='desc' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.desc} label='Description' placeholder='Enter'></CustomInput>
        </div>
        <div className="input__repair-Area">
          <CustomInput name='id' id='id' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.id} label='ID Source' placeholder='Enter'></CustomInput>
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
    </div>
  );
};

export default SectionTwo;
