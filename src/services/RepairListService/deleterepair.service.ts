import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { getAuthToken } from "../AuthService/authToken";

export const deleteRepairEntry = async (id:string) => {
    try {
        const access_token = getAuthToken()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }

    const response = await axiosInstance.delete(`${ApiRoutes.ALL_REPAIRS}/${id}`, {headers})
     if (response.status === 200) {
        console.log("Reapir Added", response.data)
     } else {
        console.log("Reapir Error", response.data)
     }
    } catch (error) {
        console.log(error)
    }
}