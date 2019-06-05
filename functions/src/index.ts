import * as functions from 'firebase-functions'
import express = require('express')

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.getRequestOrigin = functions.https.onRequest(
  /**
   * @description
   * https://firebase.google.com/docs/reference/functions/functions.https?authuser=0#.onRequest
   */
  async (req: express.Request, res: express.Response) => {
    if (req.method !== 'GET') res.sendStatus(403)
    const remoteClientIp =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress
    res.status(200).send(remoteClientIp)
  }
)
