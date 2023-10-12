import express, { Router } from 'express'
import youtubeRouter from '@modules/youtube/routers/youtube.router'

const router: Router = express.Router()

router.use('/youtube', youtubeRouter)

export default router
