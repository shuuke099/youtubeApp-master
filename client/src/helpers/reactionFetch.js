import axios from 'axios';
export const getAllComents = async () => {
	try {
		return await axios.get('/api/v1/video');
	} catch (err) {
		console.log(err.response);
	}
};

export const createSubs = () => {
	return axios.post('/api/v1/subscribes');
};
