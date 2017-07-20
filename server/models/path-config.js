import fs from 'fs';
import path from 'path';

export default class {
    constructor(folder) {
        this.folder = folder;
    }

    getDefaultPathConfig() {
        return {
            view: 'page',
            inlineStyles: this.getFileContents(['/css/inline.css']),
            remoteStyles: ['https://fonts.googleapis.com/css?family=Roboto:400,300,700,500,400italic', '/css/style.css'],
            remoteScripts: ['/script.js']
        };
    }

    // retrieves the contents from a file on the file system
    getFileContents(files) {
        let self = this;
        // concat inline styles for document <head>
        let flattenedContents = '';
        files.forEach(function(file) {
            flattenedContents += fs.readFileSync(path.resolve(__dirname) + self.folder + file);
        });

        return flattenedContents;
    }

    // retrieve the configuration for a given route
    getConfigFromAPI(urlPath, params) {
        let config = this.getDefaultPathConfig();
        let mockedApiCallConfig = {
            view: 'index',
            data: {
                header: 'This is my server side index page'
            },
            meta: {
                title: 'My Index Page',
                description: 'This is a typical server side rendered index page',
                keywords: 'nodejs,express,webpack'
            }
        };
        let pageConfig = Object.assign(config, mockedApiCallConfig);
        return Promise.resolve(pageConfig);
    };
}
