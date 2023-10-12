import { channelService, youtubeService } from '@modules/youtube/services'
import { Request, Response } from 'express'

/**
 * Permet de récupérer la dernière vidéo publiée sur une chaine Youtube
 * @param req
 * @param res
 */
export async function getLastVideoYoutubeChannel(req: Request, res: Response) {
  try {
    const { channel } = req.params
    const lastVideo = await youtubeService.getLastVideoYoutubeChannel(channel)
    res.status(200).send(lastVideo)
  } catch (err: any) {
    res.status(400).send({ error: 'Une erreur est survenue' })
  }
}

/**
 * Créer une chaine
 * @param {Request} req
 * @param {Response} res
 */
export async function createChannel(req: Request, res: Response) {
  try {
    const channelBody = req.body
    const channel = await channelService.create(channelBody)
    res.status(201).send(channel)
  } catch (err: any) {
    res.status(400).send({ error: 'Une erreur est survenue' })
  }
}

export default {
  getLastVideoYoutubeChannel,
  createChannel,
}
