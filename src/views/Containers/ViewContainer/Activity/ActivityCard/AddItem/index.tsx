import React, { useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import { useFormik } from 'formik';
import { ReactComponent as CloseIcon } from "../../../../../../assets/single color icons - SVG/close.svg";
import '../../../../../../styles/_@antOverrides.scss';
import '../../../../AddContainer/AddContainer.scss';
import PhotoDragger from '../../../../../../shared/components/Dragger';
import '../../../../../../styles/_variables.scss';
import '';
import './AddItem.scss'
import { addItemRequest } from '../../../../../../services/ContainersService/containers.service';
import { containerItemsMeta } from '../../../../../../services/ContainersService/viewcontainer.service';

interface AddItemProps {
  onclose: () => void;
}

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

  const [repData, setRepData ] = useState([])
  const [ dmgData, setDmgData ] = useState([])
  const [itemsData, setItemsData ] = useState([])
  const [ quantityData, setQuantityData ] = useState([])

  useEffect(() => {
      const fetchMeta = async () =>{
        try {
          const { repAreaData, dmgAreaData, itemTypesData, quantityData  } = await containerItemsMeta()
          setRepData(repAreaData)
          setDmgData(dmgAreaData)
          setItemsData(itemTypesData)
          setQuantityData(quantityData)
        } catch (e){}
      }
      fetchMeta()
  },[])

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
              options={repData.map(option => ({
                label: option,
                value: option
              }))}

              onChange={(value) => formik.setFieldValue('repairArea', value)}
              value={formik.values.repairArea}
            />
            <label>Damage Area</label>
            <Select
              className="container-select"
              defaultValue="select"
              options={dmgData.map(option => ({
                label: option,
                value: option
              }))}
             
              onChange={(value) => formik.setFieldValue('damageArea', value)}
              value={formik.values.damageArea}
            />
            <label>Type</label>
            <Select
              className="container-select"
              defaultValue="select"
              options={itemsData.map(option => ({
                label: option,
                value: option
              }))}

              onChange={(value) => formik.setFieldValue('type', value)}
              value={formik.values.type}
            />
            <label>Quantity</label>
            <Select
              className="container-select"
              defaultValue="select"
              options={quantityData.map(option => ({
                label: option,
                value: option
              }))}
             
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
            <button type="submit" className='submit-button'>
              Add Item
            </button>
          </Space>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
