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
    } else {
      notification.error({
        message: "Failed to Add Repair !",
        description: "Click the repair entry for more information !",
        className: "custom-notification-placement",
      });
    }
  } catch (error) {
  }
};

// Delete Repair Entry

export const deleteRepairEntry = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${ApiRoutes.ALL_REPAIRS}/${id}`);

    if (response.status === 200) {
      notification.open({message: `Repair Entry with ID ${id} Deleted`, description: 'Deleted'});
      return response.data;
    
    } else {
      notification.error({
        message: `Failed to Delete Repair ${id} !`,
        description: "Click the repair entry for more information !",
        className: "custom-notification-placement",
      });

      throw new Error("Failed to delete repair entry.");
    }
  } catch (error: any) {
    notification.error({
      message: `Failed to Delete Repair ${id} !`,
      description: "Click the repair entry for more information !",
      className: "custom-notification-placement",
    });

    throw error;
  }
};

// Edit Repair Entry

export const editRepairEntry = async (values: RepairData, id: string) => {
  try {
    const response = await axiosInstance.put(
      `${ApiRoutes.ALL_REPAIRS}/${id}`,
      values,
    );
   console.log('Edit Successful', response.data.data.message)
  } catch (error) {
    notification.error({
      message: `Failed to Edit Repair ${id}, ${error} !`,
      description: "Click the repair entry for more information !",
      className: "custom-notification-placement",
    });
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
    notification.error({
      message: `Failed to Fetch Repair ${error} !`,
      description: "Click the repair entry for more information !",
      className: "custom-notification-placement",
    });
    throw error;
  }
};
