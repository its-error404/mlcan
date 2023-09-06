import React, { useState } from 'react'
import axiosInstance, { getHeaders } from '../../../../interceptor/axiosInstance'
import { ApiRoutes } from '../../../../routes/routeConstants/apiRoutes'
import { Formik, useFormik } from 'formik'

const initialValues = {
    rep_area:"",
    dmg_area:"",
    type:"",
    merc: {
        max_mat_cost:"",
        unit_mat_cost:"",
        unit_hours:"",
        max_pcs:"",
        unit:"",
        rep_mode: "",
        desc:""
    }
  };

const AddRepairEntry = () => {

    // const formik = useFormik({
    //     initialValues,
    //   });

    // const AddEntry = () => {

    //     const [ addEntry, SetAddEntry ] = useState(null)
    //     // const [ addEntry, SetAddEntry ] = useState<Data | null> (null)

    //     // const addRepair = async() => {
    //     //     try {
    //     //         const response = await axiosInstance.post(ApiRoutes.ALL_REPAIRS, addRepairEntryData , 
    //     //             {
    //     //                 "headers": getHeaders,
    //     //             })
    //     //             SetAddEntry(response.data)
    //     //         }
    //     //         catch(error) {
    //     //             console.log(error)
    //     //         }
    //     //     }

            
    //     }
  return (
    <div>
        <div className='repair-details-part'>
            
        </div>
    </div>
  )
}

export default AddRepairEntry