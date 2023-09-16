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
        console.log(id)
        console.log(`${ApiRoutes.ALL_REPAIRS}/${id}`)
        const response = await axiosInstance.put(`${ApiRoutes.ALL_REPAIRS}/${id}`, values, {headers})
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}