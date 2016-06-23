
import Koa from 'koa';
import router from './router';

// Application specific middleware
import { logging } from './middleware';

/**
 * Starts the server
 */
export function start () {
    const app = new Koa();
    app
        /*.use(async (ctx, next) => {
            try {
                await next(); // next is now a function
            } catch (err) {
                ctx.body = { message: err.message };
                ctx.status = err.status || 500;
            }
        })*/
        .use(logging())
        .use(router.routes())
        .use(router.allowedMethods())
        .listen(process.env.PORT);
}
