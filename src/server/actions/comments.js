
import { getCommentsFromCache } from '../../common/newsfeed/service';

/**
 * Gets the comments for the message id requested
 * @param ctx
 */
const commentsAction = async (ctx) => {
    ctx.type = 'application/json';
    ctx.body = await getCommentsFromCache(ctx);
};

export default commentsAction;
