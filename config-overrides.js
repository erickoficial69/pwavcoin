const {defaultInjectConfig, rewireWorkboxInject} = require('react-app-rewire-workbox')
const path = require('path')

module.exports = function override(config, env){
    if(env === 'production'){
        console.log('generando sw')

        const workboConfig = {
            ...defaultInjectConfig,
            swSrc: path.join(__dirname,'src', 'service-worker.js')
        }

        config = rewireWorkboxInject(workboConfig)(config,env)
    }
    return config
};