
import { getMessages } from '../../common/newsfeed/service';
import render from '../render';
import { Map } from 'immutable';

/**
 * Gets the messages from the server and renders the application
 * @param ctx
 * @param next
 */
export default async function newsfeedAction (ctx, next) {
    let data = await getMessages(ctx);
    // force the app to request the comments through xhr
    data = data.setIn(['entities', 'comments'], Map());

    ctx.type = 'text/html';
    ctx.body = await render(data);

    await next();
}
