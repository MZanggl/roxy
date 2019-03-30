var lodashArray = require('lodash/array')
var lodashCollection = require('lodash/collection')
const macroMap = {}

const proxySymbol = Symbol('isProxy')

function _transformResult(result) {
    if (Array.isArray(result) && !result[proxySymbol]) {
        return proxy(result)
    }
    return result
}

function proxy(array) {
    const handler = {
        get: function get(target, prop) {          
            const lib = [lodashCollection, lodashArray, macroMap].find(lib => typeof lib[prop] === 'function')
            if (lib) {
                return function(...args) {
                    const result = lib[prop](this, ...args)
                    return _transformResult(result)
                }
            }

            if (typeof target[prop] !== 'undefined') {
                return target[prop]
            }

            if (prop === proxySymbol) {
                return true
            }
        }
    }
    
    return new Proxy(array, handler)
}

function macro(name, fn) {
    macroMap[name] = fn
}

module.exports = {
    proxy,
    macro,
}