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

interface EditContainerProps {
  onclose: () => void;
  data: any;
  id: string
}

const primaryColor = '#489482';
const textColor = 'white';

const EditContainer: React.FC<EditContainerProps> = ({ onclose, id, data }) => {
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (data) {
          console.log(data)
          setFormData(data);
        }
      }, [data]);
    
      const EditValues = {
        ...data,
      };

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
            defaultValue={formData.yard}
            onSelect={formik.handleChange}
            options={[
              { value: 'Harbour Link', label: 'Harbour Link' },
              {value: 'Nordel', label: 'Nordel'},
              {value: 'Aheer', label: 'Aheer'},
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
            <label>Container Number</label>
            <input className='container-input' defaultValue={formData.container.id} placeholder='Enter' name="uid" onChange={formik.handleChange} value={formik.values.uid}></input>
            <label>Customer</label>
            <Select
            onSelect={formik.handleChange}
            className='container-select'
            defaultValue={formData.container.customer.name}
            options={[
              { value: 'Krishna', label: 'Krishna' },
              {value: 'Ameer Krishna', label: 'Ameer Krishna'},
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
            <label>Container Owner Name</label>
            <input className='container-input' placeholder='Enter' name='owner' onChange={formik.handleChange} value={formik.values.owner}></input>
            <label>Submitter Initials</label>
            <input className='container-input' name="submitter" defaultValue={formData.submitter} placeholder='Enter' onChange={formik.handleChange} value={formik.values.submitter}></input>
            <label>Container Length</label>
            <Select
            className='container-select'
            defaultValue="select"
            options={[
              { value: '20', label: '20' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
            <label>Container Height</label>
            <Select
            className='container-select'
            defaultValue={formData.height}
            onChange={formik.handleChange}
            options={[
              { value: '20', label: '20' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
            <label>Container Type</label>
            <Select
            className='container-select'
            defaultValue={formData.containerType}
            onChange={formik.handleChange}
            options={[
              { value: '20', label: '20' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
            <label>Comments</label>
            <input className='container-input comments-add-input' defaultValue={formData.comments} placeholder='Enter'></input>
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
