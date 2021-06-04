const songController = require('../controllers/song');
const songValidation = require('../controllers/middleware/validation/song');
const router = require('express').Router();

router.post('/add', songValidation.add, songController.add);
router.post('/propose', songController.propose);

module.exports = router;
