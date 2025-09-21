const path = require('path');
module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '@root': path.resolve(__dirname),
        '@resources/(.*)$': path.resolve(__dirname, 'resources/$1'),
        '@framework/(.*)$': path.resolve(__dirname, 'resources/js/framework/$1'),
        '@app/(.*)$': path.resolve(__dirname, 'resources/js/framework/app/$1'),
        '@modules/(.*)$': path.resolve(__dirname, 'resources/js/framework/app/modules/$1'),
        '@providers/(.*)$': path.resolve(__dirname, 'resources/js/framework/app/providers/$1'),
        '@ui/(.*)$': path.resolve(__dirname, 'resources/js/framework/app/ui/$1'),
        '@website': path.resolve(__dirname, 'resources/js/framework/website'),
    }
}