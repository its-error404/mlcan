import * as yup from "yup";

export const ContainerDetailsSchema = yup.object().shape({
    yard: yup.string().required('Yard is required')  
})

