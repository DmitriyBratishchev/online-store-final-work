const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // Beare kjdewhf5454khk3f34k5ui4248frrjkef
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const data = tokenService.validateAccess(token)

    req.user = data
    next()

  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}