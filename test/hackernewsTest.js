const assert = require('chai').assert
const hackernews = require('../hackernews')

describe('Hackernews Tests', function() {

    it('getPagesArray() should return [1]', function() {
        let result = hackernews.getPagesArray(25)
        assert.equal(result, [1])
    })


})