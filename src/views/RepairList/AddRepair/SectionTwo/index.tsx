import { Button, Checkbox } from 'antd'
import React from 'react'

const SectionTwo = (formik, onclose) => {
  return (
   
        <div className="merc-plus-form-section">
            <br></br>
            <Checkbox className="no-input-box">&nbsp;&nbsp;N/A</Checkbox>
            <br></br>
            <br></br>
            <div><hr></hr></div>
            <br></br>
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
                        value={formik.values.unitMatCost}
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
                        value={formik.values.unitHours}
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
                        value={formik.values.maxPcs}
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
                <div className="input__repair-id">
                    <label>Repair Mode</label>
                    <br></br>
                    <select
                        name="rep_mode"
                        id="rep_mode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repMode}
                    >
                        <option value="">Select</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                    </select>
                </div>
                <br></br>
                <div className="input__repair-Area">
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
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
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
                        value={formik.values.repCode}
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
                        value={formik.values.comb}
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
            <div className="button-container ">
            <Button type="primary" onClick={()=> onclose }>Discard</Button>
                <button type="submit" className="final-buttons">Add Repair</button>
            </div>
            <br></br>
            <br></br>
        </div>
    )}
export default SectionTwo