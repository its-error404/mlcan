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
        console.log("Reapir Added", response.data)
     } else {
        console.log("Reapir Error", response.data)
     }
    } catch (error) {
        console.log(error)
    }
}