export function addUserData(data) {
	return dispatch => new Promise((res, rej) => {
		dispatch({
			type: 'ADD_USER_DATA',
			data,
		});

		res({ success: true });
	})
}