const axios = require('axios')

const accessToken = process.env.DIALOGFLOW_ACCESS_TOKEN
const baseURL = 'https://bot.dialogflow.com/96364e51-6490-4c97-8397-ff08bbbb77af'

module.exports = {
  send (message) {
      const data = {
        query: message,
        lang: 'en',
        sessionId: '123456789!@#$%'
      }

    return axios.post(baseURL, data, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  }
}