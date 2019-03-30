const expect = require('chai').expect
const { proxy, macro } = require('../src/roxy')

describe('array prototype', function() {
    it('should be able to access Array.prototype methods', function() {
        const numbers = proxy([1, 2, 3])
        numbers.copyWithin(0, 1, 2)
        expect(numbers).to.deep.equal([ 2, 2, 3 ])
    })
})

describe('lodash', function() {
    it('should pluck using lodash method', function() {
        const numbers = proxy([
            { id: 1 },
            { id: 2 },
            { id: 3 },
        ])

        const result = numbers.map('id')
        expect(result).to.deep.equal([ 1, 2, 3 ])
    })

    it('should be able to chain lodash methods', function() {
        const locations = proxy([
            { location: {city: 1 } },
            { location: {city: 2 } },
            { location: {city: 3 } },
        ])

        const result = locations.map('location').map('city')
        expect(result).to.deep.equal([ 1, 2, 3 ])
    })
})

describe('macros', function() {
    it('can use macros', function() {
        macro('stringify', (array, prepend) => prepend + JSON.stringify(array))

        const numbers = proxy([1, 2])
        const result = numbers.stringify('array: ')
        expect(result).to.equal('array: [1,2]')
    })
})