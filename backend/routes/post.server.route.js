// ./express-server/routes/todo.server.route.js
import express from 'express';

//import controller file
import * as postcontroller from '../controllers/post.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
     .get(postcontroller.getPosts);

export default router;
