import express from "express";

import userController from "../controllers/user.js";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

/**
 *  @swagger
 *  /api/user/add-result:
 *      post:
 *          summary: Use to add a new result - must be logged in
 *          description: Use to add a new result after a logged in user has completed the game
 *          responses:
 *              '200':
 *                  description: A successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  confirmation:
 *                                      type: string
 *                                      description: A success message
 *                                      example: Success
 *                                  message:
 *                                      type: string
 *                                      description: A response message saying what was done
 *                                      example: Result saved
 *              '401':
 *                  description: A bad request. Authorization information is missing.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  confirmation:
 *                                      type: string
 *                                      description: A failure message
 *                                      example: Fail
 *                                  message:
 *                                      type: string
 *                                      description: A response message with error explanation
 *                                      example: Not authenticated                             
 */

router.post("/add-result", isAuth, userController.postAddNewResult);

/**
 *  @swagger
 *  /api/user/profile:
 *      get:
 *          summary: Use to fetch user information - must be logged in
 *          description: Use to fetch all the user data stored in the database
 *          responses:
 *              '200':
 *                  description: A successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  confirmation:
 *                                      type: string
 *                                      description: A success message
 *                                      example: Success
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: string
 *                                              description: User id given to him by mongodb
 *                                              example: 507f1f77bcf86cd799439011
 *                                          email:
 *                                              type: string
 *                                              description: User email
 *                                              example: example@example.com
 *                                          username:
 *                                              type: string
 *                                              description: Users chosen username
 *                                              example: SljivanIvan
 *                                          isFirstTime: 
 *                                              type: boolean
 *                                              description: Boolean value if it is users first time using the app
 *                                              example: true
 *                                          solvedTexts:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                                                  description: Array of text indexes that the user has already used
 *                                                  example: 507f1f77bcf86cd799439011
 *              '401':
 *                  description: A bad request. Authorization information is missing.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  confirmation:
 *                                      type: string
 *                                      description: A failure message
 *                                      example: Fail
 *                                  message:
 *                                      type: string
 *                                      description: A response message with error explanation
 *                                      example: Not authenticated                             
 */
router.get("/profile", isAuth, userController.getUserById);

/**
 *  @swagger
 *  /api/user/results:
 *      get:
 *          summary: Use to fetch user results - must be logged in
 *          description: Use to fetch all the user results stored in the database
 *          responses:
 *              '200':
 *                  description: A successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  confirmation:
 *                                      type: string
 *                                      description: A success message
 *                                      example: Success
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: string
 *                                              description: User id given to him by mongodb
 *                                              example: 507f1f77bcf86cd799439011
 *                                          email:
 *                                              type: string
 *                                              description: User email
 *                                              example: example@example.com
 *                                          username:
 *                                              type: string
 *                                              description: Users chosen username
 *                                              example: SljivanIvan
 *                                          isFirstTime: 
 *                                              type: boolean
 *                                              description: Boolean value if it is users first time using the app
 *                                              example: true
 *                                          solvedTexts:
 *                                              type: array
 *                                              items:
 *                                                  type: string
 *                                                  description: Array of text indexes that the user has already used
 *                                                  example: 507f1f77bcf86cd799439011
 *              '401':
 *                  description: A bad request. Authorization information is missing.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  confirmation:
 *                                      type: string
 *                                      description: A failure message
 *                                      example: Fail
 *                                  message:
 *                                      type: string
 *                                      description: A response message with error explanation
 *                                      example: Not authenticated                             
 */

router.get("/results", isAuth, userController.getUserResults);

/**
 * @swagger
 * api/user/first-time:
 *   put:
 *     description: Use to update logged in user isFirstTime field to false
 *     responses:
 *       '200':
 *         description: A successful response
 */

router.put("/first-time", isAuth, userController.updateFirstTime);

export default router;
