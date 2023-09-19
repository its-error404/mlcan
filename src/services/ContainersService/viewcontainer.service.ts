import { deserialize } from 'serializr';
import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { getWorkingContainer } from '../ContainersService/containers.service'
import { CommentsData } from '../../models/comments.model';
import { InspectionForm } from '../../models/inspectionform.model';
import { PhotoDetails } from '../../models/photoData.model';
import { QuoteDetails } from '../../models/quotedata.model';
import { RepairResponseData } from '../../models/repairFormData.model';

export const fetchActivityData = async () => {
  const query = `{"container": "64a53e59c637122f8ba5421e"}`

  const photoQuery = `64a63ed193c84f257a88415e`
  const photoURL = `${ApiRoutes.CONT_PHOTO}/${photoQuery}`;
  const inspectionForm = `${ApiRoutes.INSPECTION_FORM}`;
  const quoteForm = `${ApiRoutes.QUOTE_FORM}`
  const repairForm = `${ApiRoutes.REPAIR_FORM}`;

  try {
    const photoResponse = await axiosInstance.get(photoURL)
    const inspectionFormResponse = await axiosInstance.get(inspectionForm)
    const quoteFormResponse = await axiosInstance.get(quoteForm)
    const repairFormResponse = await axiosInstance.get(repairForm)

    if (photoResponse.status === 200 && quoteFormResponse.status === 200 && inspectionFormResponse.status === 200 && repairFormResponse.status) {
      const photoJsonData = photoResponse.data.data
      const inspectionJsonData = inspectionFormResponse.data.data
      const quoteJsonData = quoteFormResponse.data.data
      const repairFormJsonData = repairFormResponse.data.data

      // const photoData: PhotoDetails = deserialize(PhotoDetails, photoJsonData);
      // const inspectionData: InspectionForm = deserialize(InspectionForm, inspectionJsonData);
      // const quoteData: QuoteDetails = deserialize(QuoteDetails, quoteJsonData);
      // const repairData: RepairResponseData = deserialize(RepairResponseData, repairFormJsonData);

      return {photoJsonData, inspectionJsonData, quoteJsonData, repairFormJsonData}

  } else {
    throw new Error ("Request Failed !")
  }
  } catch (error) {
    throw error;
  }
};

export const fetchCommentsData = async () => {
  const query = `{"container": "64a53e59c637122f8ba5421e"}`
  const URL = `${ApiRoutes.COMMENTS}?query=${query}`

  try {
    const response = await axiosInstance.get(URL)

    if (response.status === 200) {
        const jsonData = response.data.data
        const commentsData: CommentsData = deserialize(CommentsData, jsonData);
        return commentsData
  } else {
    throw new Error ("Request Failed !")
  }
} catch (err) {
    console.log(err)
    return []
};
}

export const fetchLogData = async () => {
    const query = `{"container": "64a53e59c637122f8ba5421e"}`
  const URL = `${ApiRoutes.COMMENTS}?query=${query}`

  try {
    const response = await axiosInstance.get(URL)

    if (response.status === 200) {
        const jsonData = response.data.data
        const commentsData: CommentsData = deserialize(CommentsData, jsonData);
        return commentsData
  } else {
    throw new Error ("Request Failed !")
  }
} catch (err) {
    console.log(err)
    return []
};
};

//Repair form call

export const expandedRepairForm = async (formId: string) => {
  try {
    const response = await axiosInstance.get(`${ApiRoutes.REPAIR_FORM}/${formId}`)
    if(response.status === 200) {
      const expandedRepairFormData = response.data
      return expandedRepairFormData
    } else {
      console.log('ID doesnt exist')
    }
  } catch (e) {
    console.log(e)
  }
}
