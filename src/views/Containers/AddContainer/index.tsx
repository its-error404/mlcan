import React from 'react'
import { Button, Input, Select, Space } from 'antd'
import { useFormik } from 'formik';
import { ContainerData, InitialContainerFormValues } from '../../../models/singlecontainer.model';
import { ContainerDetailsSchema } from './ValidationSchema';
import { addContainerRequest } from '../../../services/ContainersService/containers.service';
import { ReactComponent as CloseIcon } from "../../../assets/single color icons - SVG/close.svg";
import './AddContainer.scss'

interface AddContainerProps {
  onclose: () => void;
}

const AddContainer: React.FC<AddContainerProps> = ({ onclose }) => {

  const formik = useFormik({
    initialValues: InitialContainerFormValues,
    validationSchema: ContainerDetailsSchema,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values: any) => {
        try {
            await addContainerRequest(values)
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
                <Select className='container-select' defaultValue='Select' options={[{value: 'Ameer'}, {value: 'Yard'}]}></Select>
                {/* <Input className='container-input' placeholder='Enter'></Input> */}
                </Space>
                
               </form>
                </div>
                </div>
  )
}

export default AddContainer
