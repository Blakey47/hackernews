const cheerio = require('cheerio') 
const assert = require('chai').assert
const hackernews = require('../hackernews')

describe("Hacker News Test", function() {

    describe('getPagesArray() Tests', function() {

        it('getPagesArray(25) should return [1]', function() {
            let result = hackernews.getPagesArray(25)
            assert.deepEqual(result, [1])
        })
    
        it('getPagesArray(58) should return [1,2]', function() {
            let result = hackernews.getPagesArray(58)
            assert.deepEqual(result, [1, 2])
        })
    
        it('getPagesArray(83) should return [1,2,3]', function() {
            let result = hackernews.getPagesArray(83)
            assert.deepEqual(result, [1, 2, 3])
        })
    
        it('getPagesArray(100) should return [1,2,3,4]', function() {
            let result = hackernews.getPagesArray(100)
            assert.deepEqual(result, [1, 2, 3, 4])
        })
    
        it('getPagesArray(105) should return  "Please enter a number between 1 and 100"', function() {
            let result = hackernews.getPagesArray(105)
            assert.deepEqual(result,  "Please enter a number between 1 and 100")
        })
    
        it('getPagesArray(-10) should return "Please enter a number between 1 and 100"', function() {
            let result = hackernews.getPagesArray(-10)
            assert.deepEqual(result, "Please enter a number between 1 and 100")
        })
    
        it('getPagesArray("n") should return "Number of stories not valid input"', function() {
            let result = hackernews.getPagesArray('n')
            assert.deepEqual(result, "Number of stories not valid input")
        })
    
    })
    
    describe('getPageHTML() Tests', function () {
        

    })

    describe('getHTML() Tests', function () {
        

    })

    describe('getStories() Tests', function () {
        

    })

    describe('validateArg() Tests', function () {
        

    })

    describe('validatePage() Tests', function () {
        

    })

    describe('validateURI() Tests', function () {
        

    })

    describe('validatePoints() Tests', function () {
        

    })

    describe('validateComments() Tests', function () {
        

    })

    describe('validateRank() Tests', function () {
        

    })

    describe('validateInput() Tests', function () {
        

    })

})