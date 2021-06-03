const songController = require('../controllers/song');
const songValidation = require('../controllers/middleware/validation/song');
const router = require('express').Router();

router.post('/', songValidation.add, songController.add);

module.exports = router;
