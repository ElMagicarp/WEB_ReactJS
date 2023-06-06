const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const auth = (authHeader) => {
    // Verify token, returns user object if valid, else returns null
    if (authHeader === null || authHeader === undefined || authHeader === '') {
        return null
    }
    return new Promise((resolve, reject) => {
        let token = authHeader.split(' ')[1]
        client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
        })
        .then((response) => {
            resolve(response.payload);
        })
        .catch((err) => {
            reject(null);
        })
    })
}

module.exports = auth