import axios from 'axios';

const axiosConfig = axios.create();
axiosConfig.defaults.baseURL = '';

export default axiosConfig;
