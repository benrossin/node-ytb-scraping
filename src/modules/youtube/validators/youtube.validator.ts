import { object, string } from 'yup'

const schemaSearchLastVideo = object({
  params: object({
    channel: string().required('Champ requis'),
  }).noUnknown(),
})

const schemaCreateChannel = object({
  body: object({
    name: string().required('Champ requis'),
  }).noUnknown(),
})

export default {
  schemaSearchLastVideo,
  schemaCreateChannel,
}
