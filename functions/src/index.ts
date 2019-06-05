import * as functions from 'firebase-functions'
import express = require('express')

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.getRequestOrigin = functions.https.onRequest(
  /**
   * @description Same as express response handler
   * https://firebase.google.com/docs/reference/functions/functions.https?authuser=0#.onRequest
   */
  async (req: express.Request, res: express.Response) => {
    if (req.method !== 'GET') res.sendStatus(403)
    res.send({
      origin: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    })
  }
)
