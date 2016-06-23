
import koaRouter from 'koa-router';
import newsfeedAction from './actions/newsfeed';
import commentsAction from './actions/comments';

/**
 * New Koa Router instance
 */
const router = koaRouter();

// routes
router.get('/', newsfeedAction);
router.get('/message/:msgId/comments', commentsAction);

export default router;
