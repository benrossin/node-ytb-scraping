import puppeteer from 'puppeteer'
import channelRepository from '@modules/youtube/repositories/channel.repository'
import videoRepository from '@modules/youtube/repositories/video.repository'
import twilioService from '@modules/twilio/services/twilio.service'
import { Video } from '@modules/youtube/interfaces/Video'
import { Channel } from '@modules/youtube/interfaces/Channel'

/**
 * Retourne les infos de la dernière vidéo via Puppeteer
 * @param {string} url
 * @returns {Promise<Partial<Video>>}
 */
async function getPuppeteerVideoYoutube(url: string): Promise<Partial<Video>> {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle2' })

  await page.goto(url)

  // Passer le popup pour accepter les conditions Youtube
  await navigationPromise
  await page.waitForSelector("button[aria-label='Tout accepter']", { visible: true })
  await page.click("button[aria-label='Tout accepter']")

  // Direction la page de la dernière vidéo
  await navigationPromise
  await page.waitForSelector('#contents ytd-rich-grid-row:nth-child(1) #contents ytd-rich-item-renderer:nth-child(1)', { visible: true })
  await page.click('#contents ytd-rich-grid-row:nth-child(1) #contents ytd-rich-item-renderer:nth-child(1)')

  await navigationPromise
  // FIXME: Problème, waitForSelector ne permet pas de passer à la suite du script
  // donc waitForTimeout pour attendre la fin de chargement complet de la page
  await page.waitForTimeout(10000)

  // Crée l'objet video avec les données reçues de la page
  const video: Partial<Video> = {}
  video.name = await page.$eval('title', (el) => el.innerHTML)
  video.publication_date = (await page.$eval('#factoids ytd-factoid-renderer:last-child .factoid', (el) => el.getAttribute('aria-label'))) || ''
  video.scrapping_date = new Date()

  await browser.close()

  return video
}

/**
 * Recherche la dernière vidéo publiée sur une chaine Youtube et envoie un SMS
 * @param {string} channel
 * @returns {Promise<void>}
 */
async function searchLastVideoYoutube(channel: string): Promise<void> {
  const channelLink = `https://www.youtube.com/@${channel}/videos`

  const channelObj: Channel = await channelRepository.getByName(channel)
  if (!channelObj) {
    throw new Error('Cette chaîne est introuvable')
  }

  const video = await getPuppeteerVideoYoutube(channelLink)
  video.channel_id = channelObj.id

  const lastVideoChannel: Video = await videoRepository.getLastVideoChannel(channelObj.id)

  await videoRepository.upsert(video)

  if (lastVideoChannel?.name !== video.name) {
    await twilioService.sendSMS(`Une nouvelle vidéo intitulée ${video.name} vient d'être publiée sur la chaine de ${channelLink}`)
  }
}

/**
 * Récupère la dernière vidéo d'une chaine Youtube enregistrée en BDD
 * @param {string} channel
 * @returns {Promise<Video>}
 */
async function getLastVideoYoutubeChannel(channel: string): Promise<Video> {
  const channelObj: Channel = await channelRepository.getByName(channel)
  if (!channelObj) {
    throw new Error('Cette chaîne est introuvable, veuillez la créer')
  }
  const video: Video = await videoRepository.getLastVideoChannel(channelObj.id)
  return video
}

export default {
  searchLastVideoYoutube,
  getLastVideoYoutubeChannel,
}
