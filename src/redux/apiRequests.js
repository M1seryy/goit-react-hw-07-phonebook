import axios from 'axios';

axios.defaults.baseURL = `https://64dccaede64a8525a0f726c5.mockapi.io`;

export const getAllContacts = async () => {
  const response = await axios.get('/getAll');
  return response.data;
};

export const createNewContact = body => {
  const response = axios.post('/getAll', body);
  console.log(response);
  return response;
};
