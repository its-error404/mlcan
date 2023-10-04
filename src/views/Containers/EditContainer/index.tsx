import React, { useEffect, useState } from 'react'
import { Input, Select, Space } from 'antd'
import { useFormik } from 'formik';
import { editContainerRequest } from '../../../services/ContainersService/containers.service';
import { ReactComponent as CloseIcon } from "../../../assets/single color icons - SVG/close.svg";
import '../../../styles/_@antOverrides.scss'
import '../AddContainer/AddContainer.scss'
import PhotoDragger from '../../../shared/components/Dragger';
import '../../../styles/_variables.scss'
import 'antd/dist/antd.css';
import axiosInstance from '../../../interceptor/axiosInstance';
import { ApiRoutes } from '../../../routes/routeConstants/apiRoutes';

interface EditContainerProps {
  onclose: () => void;
  data: any;
  id: string
}

const primaryColor = '#489482';
const textColor = 'white';

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
    
     useEffect(()=> {
      axiosInstance
          .get(`${ApiRoutes.LENGTH}`)
          .then(response => {
            setLength(response.data.data.values)
          })
    
          axiosInstance
          .get(`${ApiRoutes.HEIGHT}`)
          .then(response => {
            setHeight(response.data.data.values)
          })
    
          axiosInstance
          .get(`${ApiRoutes.YARDS}`)
          .then(response => {
            setYardNames(response.data.data.values)
          })
    
          axiosInstance
          .get(`${ApiRoutes.CON_TYPES}`)
          .then(response => {
            setType(response.data.data.values)
          })
     },[])

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
          <h2>Add New Container</h2>
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
            <button
              type="submit"
              style={{
                backgroundColor: primaryColor,
                width: "580px",
                height: "40px",
                color: textColor,
                border: "1px solid transparent",
                borderRadius: "10px",
                cursor: 'pointer'
              }}
            >
              Edit Container
            </button>
          </Space>
        </form>
      </div>
    </div>
  )
}


export default EditContainer
