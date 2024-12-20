const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jourValidation = require('../../validations/journey.validation');
const jourController = require('../../controllers/journey.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(jourValidation.createJourney), jourController.createJourney)
  .get(auth(), validate(jourValidation.getJourneys), jourController.getJourneys)

router.route("/:journey/like")
  .post(auth(), jourController.likeJourney)
  .delete(auth(), jourController.dislikeJourney);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Journeys
 *   description: Journeys management and retrieval
 */

/**
 * @swagger
 * /journeys/{id}/like:
 *   get:
 *     summary: Like a journey
 *     description: Logged in users can like posts that they don't already like'
 *     tags: [Journeys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Journey id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Journey'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *
 *   delete:
 *     summary: Dislike a journey
 *     description: Logged in users can dislike posts that they don't already dislike
 *     tags: [Journeys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Journey id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /journeys:
 *   get:
 *    tags: [Journeys]
 *   post:
 *    tags: [Journeys]
 *   update:
 *    tags: [Journeys]
 *   delete:
 *    tags: [Journeys]
 *
 *
 */
