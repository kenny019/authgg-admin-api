const axios = require('axios').default;


class AuthGG {
	constructor(authorisation) {
		this.authorisation = authorisation;
		this.url = 'https://developers.auth.gg/';
	}

	getUserInfo(user) {
		const params = `USERS/?type=fetch&authorization=${this.authorisation}&user=${user}`;
		return this.apiRequest(params);
	}

	getAllUsers() {
		const params = `USERS/?type=fetchall&authorization=${this.authorisation}`;
		return this.apiRequest(params);
	}

	getUserCount() {
		const params = `USERS/?type=count&authorization=${this.authorisation}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(data.value);
				else reject(null);
			});
		});
	}

	deleteUser(user) {
		const params = `USERS/?type=delete&authorization=${this.authorisation}&user=${user}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(true);
				else reject(false);
			});
		});
	}

	editUserVariable(user, variable) {
		const params = `USERS/?type=editvar&authorization=${this.authorisation}&user=${user}&value=${variable}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(true);
				else reject(false);
			});
		});
	}

	changeUserPass(user, pass) {
		const params = `USERS/?type=changepw&authorization=${this.authorisation}&user=${user}&password=${pass}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(true);
				else reject(false);
			});
		});
	}

	getLicenseInfo(license) {
		const params = `LICENSES/?type=fetch&authorization=${this.authorisation}&license=${license}`;
		return this.apiRequest(params);
	}

	getAllLicense() {
		const params = `LICENSES/?type=fetchall&authorization=${this.authorisation}`;
		return this.apiRequest(params);
	}

	deleteLicense(license) {
		const params = `LICENSES/?type=delete&license=${license}&authorization=${this.authorisation}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(true);
				else reject(false);
			});
		});
	}

	useLicense(license) {
		const params = `LICENSES/?type=use&license=${license}&authorization=${this.authorisation}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(true);
				else reject(false);
			});
		});
	}

	unUseLicense(license) {
		const params = `LICENSES/?type=unuse&license=${license}&authorization=${this.authorisation}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(true);
				else reject(false);
			});
		});
	}

	generateLicense(days, amount, level, format = 1, prefix = '', length = '') {
		let params = `LICENSES/?type=generate&days=${days}&amount=${amount}&level=${level}&authorization=${this.authorisation}`;
		if (format != 1) params += `&format=${format}`;
		if (format >= 3) {
			if (prefix === '') throw console.error('Please specify prefix to use this format');
			if (format === 4) {
				if (length === '') {
					throw console.error('Please specify length to use this format');
				}
				else {
					params += `&length=${length}`;
				}
			}
			if (format != 5) params += `&prefix=${prefix}`;
		}
		return this.apiRequest(params);
	}

	getLicenseCount() {
		const params = `LICENSES/?type=count&authorization=${this.authorisation}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(data.value);
				else reject(null);
			});
		});
	}

	getHWIDInfo(user) {
		const params = `HWID/?type=fetch&authorization=${this.authorisation}&user=${user}`;
		return this.apiRequest(params);
	}

	resetHWID(user) {
		const params = `HWID/?type=reset&authorization=${this.authorisation}&user=${user}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				if (data != null) resolve(true);
				else reject(false);
			});
		});
	}

	async apiRequest(data) {
		return axios({
			method: 'GET',
			url: this.url + data,
			responseType: 'json',
			proxy: false,
		}).then(res => {
			return res.data;
		}).catch((err) => {
			console.error(err);
		});
	}
}

axios.interceptors.response.use(response => {
	if (response.data.status === 'failed') {
		const responseError = new Error(response.data.info);
		return Promise.reject(responseError);
	}
	return response;
});


module.exports = AuthGG;