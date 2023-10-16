import { notification } from "antd";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { Repair, RepairData } from "../../models/repairList.model";
import { deserialize } from "serializr";

//Add Repair

export const addRepairRequest = async (values: Repair) => {
  try {
    await axiosInstance.post(ApiRoutes.ALL_REPAIRS, values);
      notification.success({
        message: "Repair Added Successfully !",
        description: "Click the repair entry for more information !",
        className: "custom-notification-placement",
      });
  } catch (error) {
     notification.error({
      message: "Repair Adding failed !",
      description: "Click the repair entry for more information !",
      className: "custom-notification-placement",
    });
  }
};

// Delete Repair Entry

export const deleteRepairEntry = async (id: string) => {
  try {
    await axiosInstance.delete(`${ApiRoutes.ALL_REPAIRS}/${id}`);
    notification.open({ message: `Repair Entry with ID ${id} Deleted`, description: 'Deleted' });
  } catch (error) {
    console.log(error)
  }
  notification.open({ message: `Repair Entry with ID ${id} Deleted`, description: 'cannot be Deleted' })
};

// Edit Repair Entry

export const editRepairEntry = async (values: RepairData, id: string) => {
  try {
    await axiosInstance.put(`${ApiRoutes.ALL_REPAIRS}/${id}`, values,);
    notification.success({
      message: `Repair Entry ${id} Edited Successfully !`,
      description: "Click the repair entry for more information !",
      className: "custom-notification-placement",
    });
  } catch (error) {
    notification.error({
      message: `Repair Entry ${id} Edit Failed !`,
      description: "Click the repair entry for more information !",
      className: "custom-notification-placement",
    });
  }
};

// Fetch Repair Entry

export const fetchRepairData = async () => {
  try {
    const response = await axiosInstance.get(ApiRoutes.ALL_REPAIRS);
    const jsonData = response.data.data.docs;
    const deserializedData = deserialize(RepairData, { docs: jsonData });
    const totalEntries = deserializedData?.docs?.length;
    return { deserializedData, totalEntries };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const RepairFormMeta = async () => {
  try {
    const [ repAreaOptions, dmgAreaOptions, repairTypeOptions, compOptions, damOptions, repOptions, componentOptions, eventOptions,repCategoriesOptions ] = await Promise.all([axiosInstance.get(ApiRoutes.REP_AREAS), axiosInstance.get(ApiRoutes.DMG_AREAS), axiosInstance.get(ApiRoutes.REP_TYPES), axiosInstance.get(ApiRoutes.COMP_OPTIONS), axiosInstance.get(ApiRoutes.DAM_OPTIONS), axiosInstance.get(ApiRoutes.REP_OPTIONS), axiosInstance.get(ApiRoutes.COMPONENT_OPTIONS), axiosInstance.get(ApiRoutes.EVENT_OPTIONS), axiosInstance.get(ApiRoutes.REP_CATEGORIES)])

    const repAreaOptionsData = repAreaOptions?.data?.data.values
    const dmgAreaOptionsData = dmgAreaOptions.data.data.values
    const repairTypeOptionsData = repairTypeOptions.data.data.values
    const compOptionsData = compOptions.data.data.values
    const damOptionsData = damOptions.data.data.values
    const repOptionsData = repOptions.data.data.values
    const componentOptionsData = componentOptions.data.data.values
    const eventOptionsData = eventOptions.data.data.values
    const repCategoriesOptionsData = repCategoriesOptions.data.data.values

    return {repAreaOptionsData, dmgAreaOptionsData, repairTypeOptionsData, compOptionsData, damOptionsData, repOptionsData, componentOptionsData, eventOptionsData, repCategoriesOptionsData }
  } catch (err) {throw err}
}