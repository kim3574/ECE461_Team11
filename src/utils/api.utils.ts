import axios from 'axios';
import { BASE_URL_GITHUB } from '../helpers/constants';

export const getRequest = async (endpoint: string, params?: any) => {
  const url = `${BASE_URL_GITHUB}${endpoint}`;
  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (!token) {
    throw new Error('No bearer token found');
  }
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: params
    });
    return response.data;
  } catch (error) {
    console.error('Error making GET request:', error);
    throw error;
  }
};
