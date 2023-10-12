import express, { Router } from 'express'
import validate from '@common/middlewares/validate.middleware'
import youtubeController from '@modules/youtube/controllers/youtube.controller'
import youtubeValidator from '@modules/youtube/validators/youtube.validator'

const router: Router = express.Router()

router.get('/:channel/last-video', validate(youtubeValidator.schemaSearchLastVideo), youtubeController.getLastVideoYoutubeChannel)
router.post('/channel', validate(youtubeValidator.schemaCreateChannel), youtubeController.createChannel)

export default router
