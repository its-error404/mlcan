import React from 'react';
import { Input, Select, Space } from 'antd';
import { useFormik } from 'formik';
import { ReactComponent as CloseIcon } from "../../../../../../assets/single color icons - SVG/close.svg";
import '../../../../../../styles/_@antOverrides.scss';
import '../../../../AddContainer/AddContainer.scss';
import PhotoDragger from '../../../../../../shared/components/Dragger';
import '../../../../../../styles/_variables.scss';
import 'antd/dist/antd.css';
import { addItemRequest } from '../../../../../../services/ContainersService/containers.service';

interface AddItemProps {
  onclose: () => void;
}

const primaryColor = '#489482';
const textColor = 'white';

const AddItem: React.FC<AddItemProps> = ({ onclose }) => {
  const formik = useFormik({
    initialValues: {
      repairCode: '',
      repairArea: '', 
      damageArea: '',
      type: '', 
      quantity: '', 
      location: '', 
      comments: '', 
      damagedAreaPhoto: null, 
      repairedAreaPhoto: null,
    },
    onSubmit: async (values: any) => {
      try {
        await addItemRequest(values);
        onclose();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="container-details-form">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>Add Item</h2>
          <CloseIcon width={15} onClick={onclose} />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Space direction="vertical" size={20}>
            <label>Repair Code</label>
            <Input
              className="container-input"
              placeholder="Enter"
              name="repairCode"
              onChange={formik.handleChange}
              value={formik.values.repairCode}
            />
            <label>Repair Area</label>
            <Select
              className="container-select"
              defaultValue="select"
              options={[
                { value: 'Area1', label: 'Area 1' },
                { value: 'Area2', label: 'Area 2' },
              ]}

              onChange={(value) => formik.setFieldValue('repairArea', value)}
              value={formik.values.repairArea}
            />
            <label>Damage Area</label>
            <Select
              className="container-select"
              defaultValue="select"
              options={[
                { value: 'Damage1', label: 'Damage 1' },
                { value: 'Damage2', label: 'Damage 2' },
              ]}
             
              onChange={(value) => formik.setFieldValue('damageArea', value)}
              value={formik.values.damageArea}
            />
            <label>Type</label>
            <Select
              className="container-select"
              defaultValue="select"
              options={[
                { value: 'Type1', label: 'Type 1' },
                { value: 'Type2', label: 'Type 2' },
              ]}

              onChange={(value) => formik.setFieldValue('type', value)}
              value={formik.values.type}
            />
            <label>Quantity</label>
            <Select
              className="container-select"
              defaultValue="select"
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
              ]}
             
              onChange={(value) => formik.setFieldValue('quantity', value)}
              value={formik.values.quantity}
            />
            <label>Location</label>
            <Input
              className="container-input"
              placeholder="Enter"
              name="location"
              onChange={formik.handleChange}
              value={formik.values.location}
            />
            <label>Comments</label>
            <Input
              className="container-input comments-add-input"
              placeholder="Enter"
              name="comments"
              onChange={formik.handleChange}
              value={formik.values.comments}
            />
            <label>Damaged Area Photo</label>
            <PhotoDragger
              onFileUpload={() =>{}}
              className="ant-upload-dragger"
            />
            <label>Repaired Area Photo</label>
            <PhotoDragger
              onFileUpload={() =>{}}
              className="ant-upload-dragger"
            />
            <button
              type="submit"
              style={{
                backgroundColor: primaryColor,
                width: '580px',
                height: '40px',
                color: textColor,
                border: '1px solid transparent',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              Add Item
            </button>
          </Space>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
