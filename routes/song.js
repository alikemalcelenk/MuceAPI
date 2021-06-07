const songController = require('../controllers/song');
const songValidation = require('../controllers/middleware/validation/song');
const router = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       required:
 *         - name
 *         - artist
 *         - coverArt
 *         - emotion
 *         - youtubeUrl
 *         - spotifyUrl
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the song
 *         name:
 *           type: string
 *           description: The song name
 *         coverArt:
 *           type: string
 *           description: The cover art of the song
 *         artist:
 *           type: string
 *           description: Artist of the song
 *         emotion:
 *           type: string
 *           description: Which about emotion is the song?
 *         youtubeUrl:
 *           type: string
 *           description: Youtube URL of the song
 *         spotifyUrl:
 *           type: string
 *           description: Spotify URL of the song
 *         created_at:
 *           type: date
 *           description: Created date of the song
 *       example:
 *         _id: 607352f10179b40015e33956
 *         name: Happy
 *         artist: Pharrell Williams
 *         coverArt: https://artwollect-images.s3.eu-central-1.amazonaws.com/1623069468316
 *         emotion: happy
 *         youtubeUrl: https://www.youtube.com/watch?v=ZbZSe6N_BXs
 *         spotifyUrl: https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH?si=fae83bd471a94c1c
 *         created_at: 2021-06-03T10:03:32.217+00:00
 */

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: The songs managing API
 */

/**
 * @swagger
 * /song/add:
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                artist:
 *                   type: string
 *                coverArt:
 *                   type: string
 *                emotion:
 *                   type: string
 *                youtubeUrl:
 *                   type: string
 *                spotifyUrl:
 *                   type: string
 *     responses:
 *       200:
 *         description: The song was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       500:
 *         description: Some server error
 */
router.post('/add', songValidation.add, songController.add);

/**
 * @swagger
 * /song/propose:
 *   post:
 *     summary: Propose a song
 *     tags: [Songs]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       200:
 *         description: The song was successfully proposed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       500:
 *         description: Some server error
 */
router.post('/propose', songController.propose);

module.exports = router;
