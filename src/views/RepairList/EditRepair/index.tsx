import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ReactComponent as TickIcon } from "../../../assets/single color icons - SVG/done.svg";
import { ReactComponent as CloseIcon } from "../../../assets/single color icons - SVG/close.svg";
import { Button, Checkbox } from "antd";
import "../../../styles/_variables.scss";
import repairDetailsSchema from "./EditFormValidation";
import "../EditRepair/EditRepair.scss";
import SectionZero from "./SectionZero";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo/";
import { editRepairEntry } from "../../../services/RepairListService/repair.service";

interface EditRepairProps {
  data: any;
  onClose: () => void;
  id: any;
}

const EditRepair: React.FC<EditRepairProps> = ({ data, onClose, id }) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const EditValues = {
    ...data,
  };

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
    initialValues: EditValues,
    validationSchema: repairDetailsSchema,
    onSubmit: async (formData) => {
      try {
        await editRepairEntry(formData, id);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const [sectionCompleted, setSectionCompleted] = useState<boolean[]>([
    false,
    false,
    false, 
  ]);

  const handleNextSection = () => {
    if (sectionIndex !== null && sectionIndex < sections.length - 1) {
      sectionCompleted[sectionIndex] = true;
      setSectionIndex(sectionIndex + 1);
    }
  };

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
      <SectionZero
        formik={formik}
        onclose={onClose}
        onNextSection={handleNextSection}
        sectionCompleted={sectionCompleted[0]}
      />
    )}
             {sectionIndex === 1 && (
      <SectionOne
        formik={formik}
        onclose={onClose}
        onNextSection={handleNextSection}
        sectionCompleted={sectionCompleted[1]}
      />
    )}
             {sectionIndex === 2 && (
      <SectionTwo
        formik={formik}
        onclose={onClose}
        sectionCompleted={sectionCompleted[2]}
      />
    )}
  </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRepair;
