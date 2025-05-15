
import { authMiddleware, isAdmin } from '../middlewares/auth_middleware';
import { createTask, getAllTasks, updateTaskById, deleteTaskById } from '../controllers/task_controller';
import loginController from '../controllers/login_controller';
import createUser from '../controllers/user_controller';
import { Router } from 'express';

const router = Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/v1/login:
 *   post:
 *     tags:
 *       -  
 *     summary: login route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: Example Name
 *               password:
 *                 type: string
 *                 example: Example Password
 *     responses:
 *       200:
 *         description: login successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *        description: Internal server error
 * 
 * /api/v1/user:
 *   post:
 *     tags:
 *      -
 *     summary: sign up route
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *            type: object
 *            properties:
 *             name:
 *              type: string
 *              example: Doe
 *     
 *             email:
 *              type: string
 *              example: doe@gmail.com
 * 
 *             password:
 *              type: string
 *              example: password123
 * 
 *             role:
 *              type: string
 *              example: user
 * 
 * 
 *     responses:
 *      201:
 *       description: User created successfully
 *      400:
 *       description: Bad request
 *      401:
 *       description: User already exist
 *      500:
 *       description: Internal server error
 *
 * */

/**
 * @swagger
 * components:
 *  securitySchema:
 *   bearerAuth:
 *    type: http
 *    shema: bearer
 *    bearerFormat: JWT
 * 
 * 
 * /api/v1/task:
 *  post:
 *   tags:
 *    - 
 *   summary: Post task route
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *         example: task title
 * 
 *        description:
 *         type: string
 *         example: task description
 * 
 *        status:
 *         type: string
 *         example: in-progress
 * 
 *        dueDate:
 *         type: date
 *         example: YYYY-MM-DD
 *   responses:
 *    201:
 *     description: New task created successful
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorize
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 *  get:
 *   tags:
 *    -
 *   summary: Get all tasks
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: Not found
 *    500:
 *     description: Internal server error
 * 
 * 
 *  

 * 
 *   
 */
/**
 * @swagger
 * /api/v1/task/{taskId}:
 *  put:
 *   tags:
 *    - 
 *   summary: update task by task ID
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: taskId
 *      required: true
 *      schema:
 *       type: string
 *      descriptio: the ID of the task to update
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *         example: task title
 * 
 *        description:
 *         type: string
 *         example: task description
 * 
 *        status:
 *         type: string
 *         example: in-progress
 * 
 *        dueDate:
 *         type: date
 *         example: YYYY-MM-DD
 *   responses:
 *    200:
 *     description: Task updated successfully
 *    400:
 *     decription: Bad request
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbidden
 *    404:
 *     description: task ID not found
 *    500:
 *     description: Internal server error
 * 
 * 
 *  delete:
 *   tags:
 *    -
 *   summary: Delete task by task ID
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: taskId
 *      required: true
 *      schema:
 *       type: string
 *      description: The ID of the task to delete
 * 
 *   responses:
 *    200:
 *     description: Task deleted successfully
 *    400:
 *     description: Bad request
 *    401:
 *     description: Unauthorized
 *    403:
 *     description: Forbideen
 *    404:
 *     description: task ID not found
 *    500:
 *     description: Internal server error! Please try again later
 *   
 * 
 * 
 * 
 * 
 *   
 *   
 */
router.post('/login', loginController);
router.post('/user', createUser);
router.route("/task")
    .post(authMiddleware, isAdmin, createTask)
    .get(authMiddleware, getAllTasks);
router.route("/task/:taskId")
    .put( authMiddleware, isAdmin, updateTaskById)
    .delete( authMiddleware, isAdmin, deleteTaskById);


export default router;