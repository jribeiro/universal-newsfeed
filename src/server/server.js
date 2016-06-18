
import Koa from 'koa';
// import router from './router';

// Application specific middleware
import { errorHandling, logging } from './middleware';

/**
 * Starts the server
 */
export function start () {

    const app = new Koa();

    app
        // .use(proxy())
        // .use(tracking())
        .use(logging())
        // .use(router.routes())
        // .use(router.allowedMethods())
        // .use(contentType())
        // .use(render())
        // .use(wdc())
        // .use(webPackDev())
        .listen(process.env.PORT);
}
