# authgg-admin-api
A nodejs wrapper for the auth.gg admin api

## Installation
```
npm i authgg-admin-api
```

## Quickstart
```js
const AuthGG = require('authgg-admin-api')

const API = new AuthGG.API(authorisationkey)
```

# Usage

```js
const AuthGG = require('authgg-admin-api')

const API = new AuthGG.API(authorisationkey)

// gets all users

API.getAllUsers().then(data => { 
	console.log(data);
});

// changes user password

API.changeUserPass('username', 'password1').then(() => {
	console.log('succesfully changed password');
})

// returns generated license based on parameters

API.generateLicense(30, 1, 1).then(data => {
	console.log(data);
})
```

# API Endpoints 

### getUserInfo(user)
Fetches info of user.

### getAllUsers()
Fetches list of all the users.

### getUserCount()
Fetch the current amount of users.

### deleteUser(user)
Delete the user from database.

### editUserVariable(user, variable)
Edit the user variable.

### changeUserPass(user, pass)
Change the user's password.

### getLicenseInfo(license)
Fetches license info of a license.

### getAllLicense()
Fetches list of all license.

### deleteLicense(license)
Delete the license from database.

### useLicense(license)
Marks the license as used.

### unUseLicense(license)
Unmarks the license as used.

### generateLicense(days, amount, level, format? = number, prefix? = string, length? = number)
Create licenses based on parameters. Format, prefix and length are optional.

### getLicenseCount()
Fetch the current amount of licenses.

### getHWIDInfo(user)
Fetch the HWID info of user.

### resetHWID(user)
Resets the HWID of user.

#
### auth.gg api documentation
[https://setup.auth.gg/](https://setup.auth.gg/)