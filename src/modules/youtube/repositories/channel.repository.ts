import { Channel } from '@modules/youtube/interfaces/Channel'
import db from '@modules/database/db'

const TABLE_NAME = 'channel'

/**
 * Retourne une chaine par son nom
 * @param {string} name
 */
function getByName(name: string) {
  return db.select().from(TABLE_NAME).where('name', name).first()
}

/**
 * Créer et retourne une chaine
 * @param {Partial<Channel>} channelObj
 */
function create(channelObj: Partial<Channel>) {
  return db.from(TABLE_NAME).insert(channelObj).returning('*')
}

export default {
  getByName,
  create,
}
