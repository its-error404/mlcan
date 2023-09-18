import * as yup from 'yup'

const repairDetailsSchema = yup.object().shape({
    rep_area: yup.string().required('Container Repair Area is required'),
    dmg_area: yup.string().required('Container Damaged Area is required'),
    type: yup.string().required('Repair Type is required'),
})

export default repairDetailsSchema;