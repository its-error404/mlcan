import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { editRepairEntry } from "../../../services/RepairListService/editrepair.service";
import { ReactComponent as TickIcon } from "../../../assets/single color icons - SVG/done.svg";
import { ReactComponent as CloseIcon } from "../../../assets/single color icons - SVG/close.svg";
import { Button, Checkbox } from "antd";
import "../../../styles/_variables.scss";
import repairDetailsSchema, { validateForm } from "./EditFormValidation";
import "../EditRepair/EditRepair.scss";
interface EditRepairProps {
  editedData: any;
  onClose: () => void;
  repairId: string; 
}

const EditRepair: React.FC<EditRepairProps> = ({ editedData, onClose, repairId }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(0);

  const [formData, setFormData] = useState<any>({});


  const [sectionIndex, setSectionIndex] = useState<number | null>(0);

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
    setSectionIndex(index === sectionIndex ? null : index);
  };

  const isSectionFilled = (index: number) => {
    return true;
  };

  const formik = useFormik({
    initialValues: editedData,
    validationSchema: validateForm,
    onSubmit: async (formData) => {
      try {
        await editRepairEntry(formData, repairId);
        onClose()
      } catch (err) {
        console.log(err);
      }
    },
  });


  return (
    <div>
      <div className="repair-details-form">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Edit Repair Part</h2>
            <CloseIcon width={15} onClick={onClose} />
          </div>
          <div className="section-buttons">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`section-button ${
                  sectionIndex === index ? "form-active" : ""
                }`}
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
                <>
                  <div className="repair-details__first-col">
                    <div className="field-1 input__repair-id repaid-id__input">
                      <label>Repair ID</label>
                      <br></br>
                      <input
                        type="text"
                        name="uid"
                        id="uid"
                        disabled
                        value={formik.values.uid}
                      />
                      {formik.touched.uid && formik.errors.uid ? (
                        <div className="field-1-error-message">
                          {formik.errors.uid}
                        </div>
                      ) : null}
                    </div>

                    <br></br>

                    <div className="container-damaged-area field-2">
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
                        <option value="" className="default-select">
                          Select
                        </option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                      </select>
                      {formik.touched.rep_area && formik.errors.rep_area ? (
                        <div className="field-2-error-message">
                          {formik.errors.rep_area}
                        </div>
                      ) : null}
                    </div>

                    <br></br>
                  </div>
                  <br></br>
                  <div className="repair-details__second-col">
                    <div className="input__repair-id field-3">
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
                      {formik.touched.dmg_area && formik.errors.dmg_area ? (
                        <div className="field-3-error-message">
                          {formik.errors.dmg_area}
                        </div>
                      ) : null}
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
                      {formik.touched.type && formik.errors.type ? (
                        <div className="field-4-error-message">
                          {formik.errors.type}
                        </div>
                      ) : null}
                    </div>
                    <br></br>
                  </div>
                  <div className="button-container">
                    <Button type="primary" onClick={onClose}>
                      Discard
                    </Button>
                    <Button type="primary">Proceed</Button>
                  </div>
                </>
              )}
              {sectionIndex === 1 && (
                  <div className="Non-maersk-details-section">
                  <br></br>
                  <label>
                    <input
                      type="checkbox"
                      name="na_1"
                      onChange={(e) => formik.setFieldValue('na_1', e.target.checked)}
                      onBlur={formik.handleBlur}
                      checked={formik.values.na_1}
                    />
                    &nbsp;&nbsp;N/A
                  </label>
                  <br></br>
                  <br></br>
                  <div className={`Non-maersk-details-content ${formik.values.na_1 ? 'disabled' : ''}`}>
                  <div className="horizontal-line">
                    <hr></hr>
                  </div>
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
                        disabled={formik.values.na_1}
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
                            disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                          disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
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
                        disabled={formik.values.na_1}
                      />
                    </div>
                    <br></br>
                    <br></br>
                  </div>
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
                  <div>
                    <hr></hr>
                  </div>
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
                    <button type="submit" className="final-buttons">
                      Add Repair
                    </button>
                  </div>
                  <br></br>
                  <br></br>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRepair;
