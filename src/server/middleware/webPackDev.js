
import fs from 'fs';
import path from 'path';

/**
 * Webpack Dev Middleware. ONLY USED IN DEV
 * @returns {webPackGenerator} Web Pack Generator Middleware
 */
export default function webPackDev () {

    if (process.env.NODE_ENV === 'development') {

        // only require things if in dev env. @todo compile in production and removed non used code paths?
        const ROOT_PATH = path.resolve(__dirname);
        const { name } = require('../../../../package.json');
        const headerHTML = fs.readFileSync(path.resolve(ROOT_PATH, '../template/header.html'), 'utf8');

        /**
         * In development environment, wraps the response in an HTML document including webpack dev server scripts.
         * Provides Hot Module Reloading
         * @param {Function} next Process the next middleware
         * @yields {Function} Next middleware
         */
        return function * webPackGenerator (next) {

            this.body = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${name}</title>
                <link rel="shortcut icon" href="//sports.staticcache.org/whassets/img/favicon.ico" type="image/x-icon">
                <link rel="stylesheet" href="http://sports.staticcache.org/whassets/_cdn/css/sports-new.css">
            </head>
            <body class="">
                ${headerHTML}
                <div class="outermain">
                    <div class="main">
                        <div class="gutter-reset">
                            <main id="main" role="main" class="maincenter competitions">
                                ${this.body}
                            </main>
                        </div>
                    </div>
                </div>
                <!-- Web Pack Dev Server scripts -->
                <script src="http://localhost:8080/webpack-dev-server.js"></script>
                <script src="http://localhost:8080/static/bundle.js"></script>
            </body>
            </html>
            `;

            yield next;
        };
    }

    return function * noop (next) {

        yield next;
    };
}
