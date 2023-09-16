import { notification } from "antd";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { getAuthToken } from "../AuthService/authToken";

export const addContainerRequest = async (values: any) => {
    try {
        const access_token = getAuthToken()
        const response = await axiosInstance.post(ApiRoutes.CONTAINERS, values, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                
            }
        })

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