import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getPostsSchema } from '../validations/posts';
import validateParams from '../utils/helpers';
import { getPostsService } from '../services/posts';

async function getPosts(req: Request, res: Response) {
  const { tags, sortBy, direction } = await validateParams(req.query, getPostsSchema);

  const response = await getPostsService(tags, sortBy, direction);
  res.json(response);
}

export default asyncHandler(getPosts);
