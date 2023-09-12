import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { getAuthToken } from "../AuthService/authToken";

export const deleteRepairEntry = async (id: string) => {
  try {
    const access_token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };

    const response = await axiosInstance.delete(
      `${ApiRoutes.ALL_REPAIRS}/${id}`,
      { headers }
    );

    if (response.status === 200) {
      console.log(`Repair Entry with ID ${id} Deleted`);

      return response.data;
    } else {
      console.log(
        `Error Deleting Repair Entry with ID ${id}: ${response.statusText}`
      );

      throw new Error("Failed to delete repair entry.");
    }
  } catch (error: any) {
    console.error(
      `Error Deleting Repair Entry with ID ${id}: ${error.message}`
    );

    throw error;
  }
};
