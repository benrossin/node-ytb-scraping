/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import router from '@common/router'
import config from '@common/config'
import initCrons from '@common/cron'

const { port, apiVersion } = config.server

const app = express()

app.use(cors())
app.use(express.json())

initCrons()

app.use(`/api/v${apiVersion}`, router)

app.get(`/api/v${apiVersion}`, (req: Request, res: Response) => {
  res.status(200).send('Hello World')
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server on port ${port}`)
})
