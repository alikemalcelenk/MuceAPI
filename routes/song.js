const songController = require('../controllers/song');
const router = require('express').Router();

router.post('/', songController.add);

module.exports = router;
