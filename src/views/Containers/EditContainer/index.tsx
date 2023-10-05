import React, { useEffect, useState } from 'react'
import { Input, Select, Space } from 'antd'
import { useFormik } from 'formik';
import { editContainerRequest, fetchEditContainerMeta } from '../../../services/ContainersService/containers.service';
import { ReactComponent as CloseIcon } from "../../../assets/single color icons - SVG/close.svg";
import '../../../styles/_@antOverrides.scss'
import '../AddContainer/AddContainer.scss'
import PhotoDragger from '../../../shared/components/Dragger';
import '../../../styles/_variables.scss'
import 'antd/dist/antd.css';
import './EditContainer.scss'
interface EditContainerProps {
  onclose: () => void;
  data: any;
  id: string
}

const EditContainer: React.FC<EditContainerProps> = ({ onclose, id, data }) => {
    const [, setFormData] = useState({});

    useEffect(() => {
        if (data) {
          setFormData(data);
        }
      }, [data]);
    
      const EditValues = {
        ...data,
      };

      const [yardNames, setYardNames] = useState([])
      const [length, setLength] = useState([])
      const [height, setHeight] = useState([])
      const [type, setType] = useState([])
    
      useEffect(() => {
        const fetchCont = async () => {
          try {
            const { contLengthData, contHeightsData, contTypesData, contYardsData } = await fetchEditContainerMeta(); 
            setLength(contLengthData);
            setHeight(contHeightsData);
            setYardNames(contYardsData);
            setType(contTypesData);
          } catch (err) {
            console.error(err);
          }
        };
        fetchCont();
      }, []);

  const formik = useFormik({
    initialValues: EditValues,
    onSubmit: async (formData) => {
      try {
        
        await editContainerRequest(formData, formData.id)
        onclose()
      } catch (err) {
        console.log(err)
      }
    }
  });

  return (
    <div className="container-details-form">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>Edit Container</h2>
          <CloseIcon width={15} onClick={onclose} />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Space direction='vertical' size={20}>
            <label>Yard Name</label>
            <Select
            className='container-select'
            defaultValue="select"
            options={yardNames.map(option => ({
              label: option,
              value: option
            }))}
          />
            <label>Container Number</label>
            <Input className='container-input' placeholder='Enter'></Input>
            <label>Customer</label>
            <Select
            className='container-select'
            defaultValue="select"
            options={[
              { value: 'Krishna', label: 'Krishna' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
            <label>Container Owner Name</label>
            <Input className='container-input' placeholder='Enter'></Input>
            <label>Submitter Initials</label>
            <Input className='container-input' placeholder='Enter'></Input>
            <label>Container Length</label>
            <Select
            className='container-select'
            defaultValue="select"
            options={length.map(option => ({
              label: option,
              value: option
            }))}

          />
            <label>Container Height</label>
            <Select
            className='container-select'
            defaultValue="select"
            options={height.map(option => ({
              label: option,
              value: option
            }))}

          />
            <label>Container Type</label>
            <Select
            className='container-select'
            defaultValue="select"
            options={type.map(option => ({
              label: option,
              value: option
            }))}

          />
            <label>Comments</label>
            <Input className='container-input comments-add-input' placeholder='Enter'></Input>
            <label>Door photo including container number</label>
            <PhotoDragger onFileUpload={() => { }} className='ant-upload-dragger' />
            <label>Left side photo</label>
            <PhotoDragger onFileUpload={() => { }} className='ant-upload-dragger' />
            <label>Right side photo</label>
            <PhotoDragger onFileUpload={() => { }} className='ant-upload-dragger' />
            <label>Front side photo</label>
            <PhotoDragger onFileUpload={() => { }} className='ant-upload-dragger' />
            <label>Interior photo</label>
            <PhotoDragger onFileUpload={() => { }} className='ant-upload-dragger' />
            <label>Underside photo</label>
            <PhotoDragger onFileUpload={() => { }} className='ant-upload-dragger' />
            <label>Roof photo</label>
            <PhotoDragger onFileUpload={() => { }} className='ant-upload-dragger' />
            <label>CSC Plate Number</label>
            <PhotoDragger onFileUpload={() => { }} className='ant-upload-dragger' />
            <button type="submit" className='submit-button'>Edit Container</button>
          </Space>
        </form>
      </div>
    </div>
  )
}


export default EditContainer
