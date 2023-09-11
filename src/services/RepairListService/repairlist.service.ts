import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';

export const fetchRepairData = async () => {
  try {
    const response = await axiosInstance.get(ApiRoutes.ALL_REPAIRS);
    const entries = response.data.data.docs; 
    const totalEntries = entries.length;
    return { response, entries, totalEntries };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};

