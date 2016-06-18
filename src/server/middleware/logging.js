
import { name as appName } from '../../../package.json';
import bunyan from 'bunyan';
import uuid from 'uuid';

const config = require('../../../bunyan.' + process.env.NODE_ENV);

/**
 * Logging Middleware.
 * @returns {Function}
 */
export const logging = function logging () {

    /**
     * Application Level Logger
     * @type {Logger}
     */
    const logger = bunyan.createLogger(Object.assign(config, {
        name: appName
    }));

    return async (ctx, next) => {

        const start = new Date;

        ctx.log = logger.child({
            requestId: uuid.v4()
        });
        // log incoming request
        ctx.log.info(`[REQ] ${ctx.method} ${ctx.path}`);

        await next;

        // log the time the request took to complete
        ctx.log.info(`[RESP] ${ctx.status} ${ctx.method} ${ctx.path} in ${new Date - start}ms`);
    };
};
