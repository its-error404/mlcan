import { notification } from "antd";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { RepairData } from "../../models/repairList.model";
import { deserialize } from "serializr";

//Add Repair

export const addRepairRequest = async (values: RepairData) => {
  try {
    const response = await axiosInstance.post(ApiRoutes.ALL_REPAIRS, values);
    if (response.status === 200) {
      notification.success({
        message: "Repair Added Successfully !",
        description: "Click the repair entry for more information !",
        className: "custom-notification-placement",
      });

      setTimeout(() => {
        notification.destroy();
      }, 3000);
      console.log("Repir Added", response.data);
    } else {
      console.log("Repair Error", response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete Repair Entry

export const deleteRepairEntry = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${ApiRoutes.ALL_REPAIRS}/${id}`);

    if (response.status === 200) {
      console.log(`Repair Entry with ID ${id} Deleted`);
      notification.open({message: `Repair Entry with ID ${id} Deleted`, description: 'Deleted'});
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

// Edit Repair Entry

export const editRepairEntry = async (values: any, id: string) => {
  try {
    const response = await axiosInstance.put(
      `${ApiRoutes.ALL_REPAIRS}/${id}`,
      values,
    );
  } catch (error) {
    console.log(error);
  }
};

// Fetch Repair Entry

export const fetchRepairData = async () => {
  try {
    const response = await axiosInstance.get(ApiRoutes.ALL_REPAIRS, {
    });
    const jsonData = response.data.data.docs;

    const deserializedData = deserialize(RepairData, { docs: jsonData });

    const totalEntries = deserializedData?.docs?.length;

    return { deserializedData, totalEntries };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
