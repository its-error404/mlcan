import { useState, useEffect } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { ContainersData, AllContainersData } from '../../models/Containers.model';
import { ContainerData } from '../../models/singlecontainer.model';
import { notification } from 'antd';
import { deserialize } from 'serializr';

export const getContainersData = async () => {
  let totalEntries = 0
  try {
    const response = await axiosInstance.get(ApiRoutes.CONTAINERS)
    const jsonData = response.data.data.docs;
    const deserializedData = deserialize(AllContainersData, { docs: jsonData  });
    if (Array.isArray(deserializedData?.docs)) {
      totalEntries = deserializedData.docs.length;
    }
    return { deserializedData, totalEntries }
  } catch (err) {
    console.log(err)
  }
}

const workingLink = `${ApiRoutes.CONTAINERS}/6496b4d51725b1f902152f0b`

export const getWorkingContainer = async () => {
  try {
    const response = await axiosInstance.get(workingLink);
    const jsonData = response.data;
    const containerInstance = deserialize(ContainerData, jsonData);
    return containerInstance;
  } catch (err) {
    console.error("Error fetching data:", err); 
    throw err;
  }
};


export const addContainerRequest = async (values: any) => {
  try {
      const response = await axiosInstance.post(ApiRoutes.CONTAINERS, values)

      if(response.status === 200) {
          notification.success({
              message: "Container Added Successfully !",
              description: "Check your container details for more information !",
              className: "custom-notification-placement",
            });
            setTimeout(() => {
              notification.destroy();
            }, 3000);
      }
      else {
          notification.error({
              message: "There was a error in adding the Container !",
              description: "Check your container details for more information !",
              className: "custom-notification-placement",
            });
          console.log("Repair Error", response.data)
       }
     
   } catch (error) {
      console.log(error)
  }
}
