import { useState, useEffect } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { SingleContainerData } from '../../models/singlecontainer.model';
import { getAuthToken } from '../AuthService/authToken';

export const useGetContainer = (docId: string) => {
    const [getContainerData, setGetContainerData] = useState<SingleContainerData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = getAuthToken();
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                };
                const response = await axiosInstance.get(`${ApiRoutes.CONTAINERS}/${docId}`, { headers });
                setGetContainerData(response.data);
            } catch (error) {
                console.error('Error fetching container data:', error);
            }
        };

        fetchData();
    }, [docId]);

    return getContainerData;
};
