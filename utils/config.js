'use strict';

const path = require('path')
    , http = require('http')
    , configStore = {
        port: 3000
        , maxAge: 31536000

        , routePath: path.join(process.cwd(), './routes.json')
        , routeJSONPath: path.join(process.cwd(), './routes.json')
        , publicPath: path.join(process.cwd(), './public')
        , templatePath: path.join(process.cwd(), './templates')

        , webSockets: false
        , compress: true
        , etags: true

        , security: {
            xssProtection: true
            , poweredBy: ''
            , noSniff: true
            , noCache: false
            , framegaurd: {
                action: 'SAMEORIGIN'
            }
            , hsts: {
                maxAge: 86400
            }
        }

        , http: http
    }

    , getConfig = (key) => {
        if (typeof key === 'string') {
            return configStore[key];
        } else {
            return configStore;
        }
    }

    , setConfig = (key, value) => {
        if (typeof key === 'object') {
            Object.keys(key).forEach((item) => {
                if (item === 'routeJSONPath' || item === 'routePath') {
                    configStore.routePath = path.join(process.cwd(), key[item]);
                    configStore.routeJSONPath = configStore.routePath;
                } else if (item === 'publicPath' || item === 'templatePath') {
                    configStore[item] = path.join(process.cwd(), key[item]);
                } else {
                    configStore[item] = key[item];
                }
            });
        } else if (typeof key === 'string') {
            configStore[key] = value;
        }

        return configStore;
    };

module.exports = {
    get: getConfig
    , set: setConfig
};
