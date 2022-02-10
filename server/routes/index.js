const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes') )
router.use('/catalog', require('./catalog.routes') )
router.use('/categories', require('./categories.routes') )
router.use('/user', require('./user.routes') )

module.exports = router;
