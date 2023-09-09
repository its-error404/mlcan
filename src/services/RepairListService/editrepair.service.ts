import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { getAuthToken } from "../AuthService/authToken";

export const editRepairEntry = async (values: any, id:string) => {
    try {
        const access_token = getAuthToken()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }

        const response = await axiosInstance.put(`/repairs/${id}`, values, {headers})
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}