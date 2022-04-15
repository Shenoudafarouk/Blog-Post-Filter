import { Router } from 'express';
import getPosts from '../controllers/posts';

export const routes = Router({ mergeParams: true });

// @route GET /api/posts
// @desc getPosts route by tags
routes.get('/', getPosts);

export default routes;
