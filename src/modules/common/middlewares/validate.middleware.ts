import { Request, Response, NextFunction } from 'express'

/**
 * Permet de valider les données de la request avec Yup
 * @param {any} schema
 */
export default function validate(schema: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      return next()
    } catch (err: any) {
      return res.status(400).send({ error: err.message })
    }
  }
}
