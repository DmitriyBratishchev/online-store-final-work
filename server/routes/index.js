const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes') )
router.use('/catalog', require('./catalog.routes') )
router.use('/categories', require('./categories.routes') )
router.use('/user', require('./user.routes') )
router.use('/image', require('./image.routes') )
router.use('/basket', require('./image.routes') )

module.exports = router;
