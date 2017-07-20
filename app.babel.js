'use strict';

import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import compression from 'compression';

import PathConfig from './server/models/path-config';

// environment constants
const PROD = 'prod';
const DEBUG = 'debug';

// configuration
let config = {
    environment: process.argv[2] || PROD,
    isHttps: process.env.isHttps === 'true' || false
};

config.folder = config.environment === DEBUG ? '/src' : '/dist';

let app = express();
app.use(compression());

let viewsDir = './server-dist/views';
let pathConfig = new PathConfig(`/../..${config.folder}`);

// setup express to use handlebars as the templating engine
let hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, `${viewsDir}/layouts`),
    partialsDir: path.join(__dirname, `${viewsDir}/partials`)
});
app.set('views', path.join(__dirname, `${viewsDir}`));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// // use live reload if debug environment
// if (config.environment === DEBUG) {
//     app.use(require('connect-livereload')());
// }
// setup server for static assets
app.use('/', express.static(path.join(__dirname, config.folder), { maxAge: 604800000 }));

// // require HTTPS
// app.use(requireHttps);
//
// // redirect to include www
// app.use(requireWww);

// // Setup body parser for parsing POST request bodies
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Setup general GET rule to display pages
app.get('/', (req, res) => {
    // retrieve the path data
    pathConfig.getConfigFromAPI('/', req.query).then((data) => {
        // if no data was returned, return a 404
        if (!data) {
            res.status(404);
            return;
        }

        // Build an object with all the data gathered
        let page = {
            data: data,
            view: data.view,
            path: req.path,
            params: req.query
        };

        // Render the page
        res.render(page.view, page);
    }).catch((error) => {
        console.error('No data available for page: ' + '/' + ' Error: ' + error.stack);
        res.render('500', { layout: false });
        return;
    });
});

// use the environment's port or a random port
// let port = process.env.port || Math.floor(Math.random() * (65535)) + 1024;
let port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Running ${config.environment} on localhost:${port}`);
});

module.exports = app;
