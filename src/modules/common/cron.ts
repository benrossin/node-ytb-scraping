import cron from 'node-cron'
import youtubeService from '@modules/youtube/services/youtube.service'
import config from '@common/config'

function initCrons() {
  cron.schedule(
    '*/1 * * * *',
    async () => {
      await youtubeService.searchLastVideoYoutube(config.channel.name)
    },
    { runOnInit: true },
  )
}

export default initCrons
