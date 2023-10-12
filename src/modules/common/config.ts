const config = {
  server: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    apiVersion: process.env.API_VERSION || 1,
  },
  database: {
    name: process.env.DB_NAME || 'main.db',
  },
  twilio: {
    sid: process.env.TWILIO_SID,
    token: process.env.TWILIO_TOKEN,
    phone: process.env.TWILIO_PHONE,
    myPhone: process.env.MY_PHONE,
  },
  channel: {
    name: process.env.CHANNEL_NAME || '',
  },
}

export default config
