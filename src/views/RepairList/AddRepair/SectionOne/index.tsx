import { Button, Checkbox } from 'antd'
import React from 'react'

const SectionOne = (onclose, formik) => {
  return (
    <div>
        <div className="Non-maersk-details-section">
                                <br></br>
                                <Checkbox className="no-input-box">&nbsp;&nbsp;N/A</Checkbox>
                                <br></br>
                                <br></br>
                                <div className="horizontal-line"><hr></hr></div>
                                <br></br>
                                <h4>Cost Details</h4>
                                <div className="repair-details__first-col">
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
                                            value={formik.values.matCost}
                                            placeholder="0$"
                                        />
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <h4>Customer Related Details</h4>
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
                                            value={formik.values.dmgArea}
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
                                <div className="repair-details__second-col">
                                    <div className="input__repair-id">
                                        <label>COMP</label>
                                        <br></br>
                                        <select
                                            name="COMP"
                                            id="COMP"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                       
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
                                            
                                        >
                                            <option value="">Select</option>
                                            <option value="Option 1">Option 1</option>
                                            <option value="Option 2">Option 2</option>
                                        </select>
                                    </div>
                                </div>
                                <br></br>
                                <div className="repair-details__second-col">
                                    <div className="input__repair-id">
                                        <label>REP</label>
                                        <br></br>
                                        <select
                                            name="REP"
                                            id="REP"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                     
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
                                      
                                        >
                                            <option value="">Select</option>
                                            <option value="Option 1">Option 1</option>
                                            <option value="Option 2">Option 2</option>
                                        </select>
                                    </div>
                                </div>
                                <br></br>
                                <div className="repair-details__second-col">
                                    <div className="input__repair-id">
                                        <label>Event</label>
                                        <br></br>
                                        <select
                                            name="event"
                                            id="event"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                         
                                        >
                                            <option value="">Select</option>
                                            <option value="Option 1">Option 1</option>
                                            <option value="Option 2">Option 2</option>
                                        </select>
                                    </div>
                                    <br></br>
                                    <div className="repair-details__first-col location-div">
                                        <div className="input__repair-id">
                                            <label>Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                id="location"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                               
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
                                <div className="button-container">
                                <Button type="primary" onClick={onclose}>Discard</Button>
                                    <Button type="primary">Proceed</Button>
                                </div>
                            </div>
    </div>
  )
}

export default SectionOne