import twilio from 'twilio'
import config from '@common/config'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'

/**
 * Envoyer un SMS
 * @param message
 */
function sendSMS(message: string): Promise<MessageInstance> {
  const client = twilio(config.twilio.sid, config.twilio.token)

  return client.messages.create({
    body: message,
    from: config.twilio.phone,
    to: config.twilio.myPhone || '',
  })
}

export default {
  sendSMS,
}
