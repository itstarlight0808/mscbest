const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '111',
    database: process.env.DB_NAME || 'musicalbest',
    waitForConnections: true,
    connectionLimit: process.env.DB_CONN_LIMIT || 2,
  },
  JWT_SECRET: process.env.JWT_SECRET || 'musicalbest123!@#',
  bcryptSalt: bcrypt.genSaltSync(12),
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
  smtp: {
	  service: "gmail",
    auth: {
	    type: "OAuth2",
      user: "example@gmail.com",
      pass: "password",
	    clientId: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      refreshToken: "REFRESH_TOKEN"
    }
  }
};
