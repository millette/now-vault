'use strict'

export default (req, res) => {
  if (req.headers['x-forwarded-for'] !== '69.171.154.246') {
    return 'oh well'
  }

  const ret = require('./vault-content.json')
  ret.headers = req.headers
  ret.auth = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString('ascii').split(':')[0]
  delete ret.headers.authorization
  return ret
}
