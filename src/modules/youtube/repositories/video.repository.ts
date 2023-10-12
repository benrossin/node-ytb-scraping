import db from '@modules/database/db'
import { Video } from '@modules/youtube/interfaces'

const TABLE_NAME = 'video'

/**
 * Retourne la dernière vidéo d'une chaine Youtube
 * @param {number} id
 */
function getLastVideoChannel(id: number) {
  return db.select().from(TABLE_NAME).where('channel_id', id).first()
}

/**
 * Ajoute ou met à jour une video
 * @param {Partial<Video>} videoObj
 * @returns
 */
function upsert(video: Partial<Video>) {
  return db(TABLE_NAME).insert(video).onConflict('channel_id').merge().returning('*')
}

export default {
  getLastVideoChannel,
  upsert,
}
