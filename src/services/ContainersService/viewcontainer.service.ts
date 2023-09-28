import { deserialize } from 'serializr';
import axiosInstance from '../../interceptor/axiosInstance';
import { ApiRoutes } from '../../routes/routeConstants/apiRoutes';
import { getWorkingContainer } from '../ContainersService/containers.service'
import { CommentsData } from '../../models/comments.model';

export const fetchActivityData = async () => {
  try {
    const response = await getWorkingContainer();
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCommentsData = async () => {
  const query = `{"container": "64a53e59c637122f8ba5421e"}`
  const URL = `${ApiRoutes.COMMENTS}?query=${query}`

  try {
    const response = await axiosInstance.get(URL)
        const jsonData = response.data.data
        const commentsData: CommentsData = deserialize(CommentsData, jsonData);
        return commentsData

} catch (err) {
    console.log(err)
    return []
};
}

export const fetchLogData = async () => {
    const query = `{"container": "64a53e59c637122f8ba5421e"}`
  const URL = `${ApiRoutes.COMMENTS}?query=${query}`

  try {
    const response = await axiosInstance.get(URL)

        const jsonData = response.data.data
        const commentsData: CommentsData = deserialize(CommentsData, jsonData);
        return commentsData

} catch (err) {
    console.log(err)
    return []
};
};
