import { useFormik } from "formik";
import React, { useState } from "react";
import {
  MercPlusDetails,
  NonMaerskDetails,
  RepairDetails,
} from "../../../models/repairForm.model";
import repairDetailsSchema from "./FormValidation";
import { Button, Checkbox } from "antd";
import "./AddRepair.scss";
import {ReactComponent as TickIcon} from '../../../assets/single color icons - SVG/done.svg'

import '../../../styles/_variables.scss'

const AddRepair = () => {
  const initialRepairFormValues = {
    ...new RepairDetails(),
    ...new MercPlusDetails(),
    ...new NonMaerskDetails(),
  };

  const [sectionIndex, setSectionIndex] = useState<number | null> (0)

  const sections = [
    {
      name: "Repair Details",
      schema: repairDetailsSchema,
    },
    {
      name: "Non-Maersk Details",
      schema: null,
    },
    {
      name: "Merc+ Details",
      schema: null,
    },
  ];

  const toggleSection = (index: number) => {
    setSectionIndex(index === sectionIndex? null : index)
  }

  const moveToNextSection = () => {
    if(sectionIndex !=null && sectionIndex < sections.length - 1) {
        setSectionIndex(sectionIndex + 1)
    }
  }

  const isSectionFilled = (index:number) => {

    return true; 
  };

  const formik = useFormik({
    initialValues: initialRepairFormValues,
    validationSchema: repairDetailsSchema,
    onSubmit: (values) => {
      console.log(values);
      moveToNextSection()
    },
  });

  return (
    <div className="repair-details-form">
      <div className="form-wrapper">
        <h2>Add Repair Part</h2>
        <div className="section-buttons">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`section-button ${sectionIndex === index ? "form-active" : ""}`}
              onClick={() => toggleSection(index)}
            >
              <div className="section-title">
                {isSectionFilled(index) && <TickIcon width={20} />}
                <span className="section-header-text">{section.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
        <form onSubmit={formik.handleSubmit}>
            {sectionIndex === 0 && (
          <><div className="repair-details__first-col">

                              <div className="input__repair-id repaid-id__input">
                                  <label>Repair ID</label>
                                  <br></br>
                                  <input
                                      type="text"
                                      name="uid"
                                      id="uid"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.uid} />
                              </div>

                              <br></br>

                              <div className="container-damaged-area">
                                  <label>Container Repair Area</label>
                                  <br></br>
                                  <select
                                      name="rep_area"
                                      id="rep_area"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.rep_area}
                                      className="select-choices"
                                  >
                                      <option value="" className="default-select">Select</option>
                                      <option value="Option 1">Option 1</option>
                                      <option value="Option 2">Option 2</option>
                                  </select>
                              </div>

                              <br></br>

                          </div><br></br><div className="repair-details__second-col">
                                  <div className="input__repair-id">
                                      <label>Container Damaged Area</label>
                                      <br></br>
                                      <select
                                          name="dmg_area"
                                          id="dmg_area"
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.dmg_area}
                                      >
                                          <option value="">Select</option>
                                          <option value="Option 1">Option 1</option>
                                          <option value="Option 2">Option 2</option>
                                      </select>
                                  </div>
                                  <br></br>
                                  <div className="input__repair-Area">
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
                                  </div>
                              </div><div className="button-container">
                                  <Button type="primary">Discard</Button>
                                  <Button type="primary">Proceed</Button>
                              </div></>
            )}
            {sectionIndex === 1 && (
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
                    value={formik.values.mat_cost}
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
                    value={formik.values.cont_section}
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
                <div className="input__repair-id repaid-id__input">
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
                    value={formik.values.comp}
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
                    value={formik.values.dam}
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
                    value={formik.values.rep}
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
              <div className="repair-details__second-col">
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
                <div className="repair-details__first-col location-div">
                  <div className="input__repair-id">
                    <label>Location</label>
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
              <div className="button-container">
                <Button type="primary">Discard</Button>
                <Button type="primary">Proceed</Button>
            </div>
            </div>
)}          
            {sectionIndex === 2 && (
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
                <div className="input__repair-id">
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
                <Button type="primary">Discard</Button>
                <Button type="primary" className="final-buttons">Add Repair</Button>
            </div>
              <br></br>
              <br></br>
            </div>
            )}
          </form>
          </div>
        </div>
      </div>
  );
};

export default AddRepair;
