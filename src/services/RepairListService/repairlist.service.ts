import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { deserialize } from 'serializr';
import { RepairData } from '../../models/repairList.model'

export const fetchRepairData = async () => {
  try {
    const response = await axiosInstance.get(ApiRoutes.ALL_REPAIRS);
    const jsonData = response.data.data.docs;

    const deserializedData = deserialize(RepairData, { docs: jsonData });

    const totalEntries = deserializedData?.docs?.length
    return { deserializedData, totalEntries };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
