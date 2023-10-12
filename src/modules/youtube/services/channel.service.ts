import { Channel } from '@modules/youtube/interfaces'
import { channelRepository } from '@modules/youtube/repositories'

/**
 * Créer une chaine
 * @param {Partial<Channel>} channel
 * @returns {Promise<Channel>}
 */
async function create(channel: Partial<Channel>): Promise<Channel> {
  const [channelInserted] = await channelRepository.create(channel)
  return channelInserted
}

export default {
  create,
}
