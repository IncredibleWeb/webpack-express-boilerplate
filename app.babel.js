'use strict';

import http from 'http';
import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import PathConfig from './server/models/path-config';
import bodyParser from 'body-parser';
import compression from 'compression';

let app = express();
app.use(compression());

let viewsDir = './templates';

let pathConfig = new PathConfig(`/../../${process.env.outputFolder}`);

// setup express to use handlebars as the templating engine
let hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, `${viewsDir}/layouts`),
    partialsDir: path.join(__dirname, `${viewsDir}/partials`)
});
app.set('views', path.join(__dirname, `${viewsDir}`));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// setup server for static assets
app.use('/', express.static(`${process.env.outputFolder}`, { maxAge: 604800000 }));

// Setup body parser for parsing POST request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.port || 3000;

// POST route for form submission
app.post('/', (req, res) => {
    // validate the model
    if (req.body.email !== '') {
        res.redirect('/success');
    }
    res.redirect('/');
});

// setup server urls
app.get('/*', function(req, res) {
    // extract the path from the url
    let urlSections = req.path.split('/');
    urlSections = urlSections.filter((sectionString) => {
        return sectionString.length > 0;
    });

    let urlPath = null;
    if (urlSections.length === 0) {
        if (urlSections[0] === '') {}
        urlPath = '/';
    } else {
        urlPath = '/' + urlSections.join('/');
    }

    // retrieve the path data
    let pathConfigData = pathConfig.getConfig(urlPath);
    if (!pathConfigData) {
        res.status(404).send();
        return;
    }

    // render the response
    res.render(pathConfigData.data.view, pathConfigData);
});

// only create two servers if running on localhost
http.createServer(app).listen(port, () => {
    return console.log(`Running Example on localhost:${port}`);
});

module.exports = app;
