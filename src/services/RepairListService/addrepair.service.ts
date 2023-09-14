import { notification } from "antd";
import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { getAuthToken } from "../AuthService/authToken";

export const addRepairRequest = async (values: any) => {
    try {
        const access_token = getAuthToken()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }

     const response = await axiosInstance.post(ApiRoutes.ALL_REPAIRS, values, {headers})
     if (response.status === 200) {
            notification.success({
                message: "Repair Added Successfully !",
                description: "Click the repair entry for more information !",
                className: "custom-notification-placement",
              });
      
              setTimeout(() => {
                notification.destroy();
              }, 3000);
        console.log("Repir Added", response.data)
     } else {
        console.log("Repair Error", response.data)
     }
    } catch (error) {
        console.log(error)
    }
}