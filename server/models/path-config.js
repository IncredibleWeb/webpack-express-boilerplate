import fs from 'fs';
import path from 'path';

export default class {
    constructor(folder, pathConfigs) {
        this.folder = folder;
        this.pathConfigs = {
            '/': {
                view: 'index',
                metaTitle: 'Webpack Example',
                title: 'Webpack Example',
                remoteScripts: ['/script.js']
            },
            '/success': {
                view: 'empty',
                metaTitle: 'Success',
                title: 'Success',
                remoteScripts: ['/script.js']
            }
        };
    }

    getFileContents(files) {
        let self = this;
        // concat inline styles for document <head>
        let flattenedContents = '';
        files.forEach(function(file) {
            flattenedContents += fs.readFileSync(path.resolve(__dirname) + self.folder + file); // eslint-disable-line no-undef
        });

        return flattenedContents;
    }

    getConfig(urlPath) {
        let object = this.pathConfigs[urlPath];

        // check if the path is actually valid.
        if (!object) {
            return null;
        }

        return {
            'data': object
        };
    }
}
