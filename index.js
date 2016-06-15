// core
import querystring from 'querystring'

// npm
import Now from 'now-api'

export default (req, res) => new Promise((resolve, reject) => {
  if (req.method !== 'POST') { return reject('expected post') }

  let body = ''

  req.on('data', function (data) {
    body += data
    if (body.length > 10000) {
      req.connection.destroy()
      reject('too much')
    }
  })

  req.on('end', function () {
    const post = querystring.parse(body)
    const now = new Now(post.AUTH_TOKEN)
    now.getDeployment(post.DEPLOYMENT_ID)
      .then((dep) => {
        if ('https://' + dep.host === post.NOW_URL) {
          const appName = dep.host.match(/^(.*)-(.*)\.now\.sh$/)
          if (appName.length === 3) {
            resolve([post.shared, appName[1]])
          } else {
            reject('bad host')
          }
        } else {
          reject('bad auth')
        }
      })
      .catch((e) => reject(e))
  })
})
  .then((d) => {
    return {
      secrets: require(`./secrets-${d[1]}.json`),
      shared: d[0]
    }
  })
  .catch((e) => {
    return {
      error: e
    }
  })
