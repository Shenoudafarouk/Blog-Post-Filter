import { Request, Response, Router } from 'express';
import postsRoutes from './posts';
import { errorHandler, notFound } from '../middlewares/error';

const router = Router();

router.use('/posts', postsRoutes);

router.use('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

router.use(notFound);
router.use(errorHandler);

export default router;
