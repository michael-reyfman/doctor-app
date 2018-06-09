import axios from 'axios';

const serverRequest = (method, query) => {
	return new Promise((resolve, reject) => {
		const url = `http://localhost:3000/graphql`;
		axios({
			url,
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			data: {
				query,
			},
		}).then(result => {
			console.log(result.data);
			return resolve(result.data.data);
		}).catch(err => reject(err));
	})
};

export default serverRequest;