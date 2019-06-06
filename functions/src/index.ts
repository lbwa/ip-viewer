import * as functions from 'firebase-functions'
import express = require('express')

exports.getRequestOrigin = functions.https.onRequest(
  /**
   * @description Same as express response handler
   * https://firebase.google.com/docs/reference/functions/functions.https?authuser=0#.onRequest
   */
  async (req: express.Request, res: express.Response) => {
    if (req.method !== 'GET') res.sendStatus(403)

    const origin =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const __FROM_DEV__ = /^http:\/\/localhost/.test(origin as string)
    res.set(
      'Access-Control-Allow-Origin',
      __FROM_DEV__ ? '*' : 'https://ip.set.sh'
    )
    res.send({ origin })
  }
)
