import * as yup from 'yup'
import { MercPlusDetails, NonMaerskDetails, RepairDetails } from '../../../models/repairForm.model';

type InitialRepairFormValues = RepairDetails & MercPlusDetails & NonMaerskDetails

const initialRepairFormValues: InitialRepairFormValues = {
    ...new RepairDetails(),
    ...new MercPlusDetails(),
    ...new NonMaerskDetails(),
};

const repairDetailsSchema = yup.object().shape({
    rep_area: yup.string().required('Container Repair Area is required'),
    dmg_area: yup.string().required('Container Damaged Area is required'),
    type: yup.string().required('Repair Type is required'),
})

export const validateForm = async (values: typeof initialRepairFormValues) => {
    try {
        await repairDetailsSchema.validate(values, { abortEarly: false });
        return {}
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors: {[key:string]: string} = {}
            error.inner.forEach((error) => {
                errors[error.path] = error.message
            })
            return errors
        }
        throw error
}
}

export default repairDetailsSchema;