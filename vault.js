'use strict'

export default (req, res) => {
  const ret = req.headers

  ret.auth = new Buffer(ret.authorization.split(' ')[1], 'base64').toString('ascii').split(':')[0]
  delete ret.authorization

  return ret 
}

