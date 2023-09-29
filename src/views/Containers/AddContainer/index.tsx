import React from 'react'
import { Input, Space } from 'antd'
import { useFormik } from 'formik';
import {  InitialContainerFormValues } from '../../../models/singlecontainer.model';
import { addContainerRequest } from '../../../services/ContainersService/containers.service';
import { ReactComponent as CloseIcon } from "../../../assets/single color icons - SVG/close.svg";
import '../../../styles/_@antOverrides.scss'
import './AddContainer.scss'
import PhotoDragger from '../../../shared/components/Dragger';
import '../../../styles/_variables.scss'

interface AddContainerProps {
  onclose: () => void;
}

const primaryColor = '#489482';
const textColor = 'white';

const AddContainer: React.FC<AddContainerProps> = ({ onclose }) => {

  const formik = useFormik({
    initialValues: InitialContainerFormValues,
    onSubmit: async (values: any) => {
      try {
        await addContainerRequest(values)
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
          <Space direction='vertical'>
            <label>Yard Name</label>
            <select className='container-select'>
              <option>Yard</option>
            </select>
            <label>Container Number</label>
            <Input className='container-input' placeholder='Enter'></Input>
            <label>Customer</label>
            <select className='container-select'>
              <option>Krishna</option>
            </select>
            <label>Container Owner Name</label>
            <Input className='container-input' placeholder='Enter'></Input>
            <label>Submitter Initials</label>
            <Input className='container-input' placeholder='Enter'></Input>
            <label>Container Length</label>
            <select className='container-select'>
              <option>20</option>
            </select>
            <label>Container Height</label>
            <select className='container-select'>
              <option>20</option>
            </select>
            <label>Container Type</label>
            <select className='container-select'>
              <option>20</option>
            </select>
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
              Add Container
            </button>
          </Space>
        </form>
      </div>
    </div>
  )
}

export default AddContainer
