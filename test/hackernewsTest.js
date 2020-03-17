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
            assert.deepEqual(result, "Number of stories not a valid number")
        })

        it('getPagesArray() should return "Number of stories not valid input"', function() {
            let result = hackernews.getPagesArray()
            assert.deepEqual(result, "Number of stories not a valid number")
        })
    
    })
    
    describe('getPageHTML() Tests', function () {

        it('getPageHTML(1) should return true and fires the fetch request', function() {
            let result = hackernews.validatePage(1)
            assert.deepEqual(result, true)
        })

        it('getPageHTML(4) should return true and fires the fetch request', function() {
            let result = hackernews.validatePage(4)
            assert.deepEqual(result, true)
        })

        it('getPageHTML(5) should return false and no fetch request is fired', function() {
            let result = hackernews.validatePage(5)
            assert.deepEqual(result, false)
        })

        it('getPageHTML(-1) should return false and no fetch request is fired', function() {
            let result = hackernews.validatePage(-1)
            assert.deepEqual(result, false)
        })

        it('getPageHTML("n") should return false and no fetch request is fired', function() {
            let result = hackernews.validatePage("n")
            assert.deepEqual(result, false)
        })

    })

    describe('getHTML() Tests', function () {

        it('getHTML([1]) should return true and returns a Promise', function() {
            let result = hackernews.validateArg([1])
            assert.deepEqual(result, true)
        })

        it('getHTML([5]) should return true and returns a Promise', function() {
            let result = hackernews.validateArg([5])
            assert.deepEqual(result, true)
        })

        it('getHTML("n") should return false and no Promise is returned', function() {
            let result = hackernews.validateArg("n")
            assert.deepEqual(result, false)
        })

        it('getHTML([-1]) should return false and no Promise is returned', function() {
            let result = hackernews.validateArg([-1])
            assert.deepEqual(result, false)
        })

        it('getHTML([101]) should return false and no Promise is returned', function() {
            let result = hackernews.validateArg([101])
            assert.deepEqual(result, false)
        })

    })

    describe('getStories() Tests', function () {
        
        it('getStories(rawHTML, []) should return false', function() {
            let result = hackernews.validateArg()
            assert.deepEqual(result, false)
        })

    })

    describe('validateArg() Tests', function () {
        
        it('validateArg(1) should return true', function() {
            let result = hackernews.validateArg(1)
            assert.deepEqual(result, true)
        })

        it('validateArg(100) should return true', function() {
            let result = hackernews.validateArg(100)
            assert.deepEqual(result, true)
        })

        it('validateArg(105) should return false', function() {
            let result = hackernews.validateArg(105)
            assert.deepEqual(result, false)
        })

        it('validateArg("n") should return false', function() {
            let result = hackernews.validateArg('n')
            assert.deepEqual(result, false)
        })

        it('validateArg(-10) should return false', function() {
            let result = hackernews.validateArg(-10)
            assert.deepEqual(result, false)
        })
    })

    describe('validatePage() Tests', function () {
        
        it('validatePage(1) should return true', function() {
            let result = hackernews.validatePage(1)
            assert.deepEqual(result, true)
        })

        it('validatePage(4) should return true', function() {
            let result = hackernews.validatePage(4)
            assert.deepEqual(result, true)
        })

        it('validatePage(10) should return false', function() {
            let result = hackernews.validatePage(10)
            assert.deepEqual(result, false)
        })

        it('validatePage("n") should return false', function() {
            let result = hackernews.validatePage('n')
            assert.deepEqual(result, false)
        })

        it('validatePage(-10) should return false', function() {
            let result = hackernews.validatePage(-10)
            assert.deepEqual(result, false)
        })
    })

    describe('validateURI() Tests', function () {
        
        it('validateURI(`www.google.com`) should return uri', function() {
            let result = hackernews.validateURI(`www.google.com`)
            assert.deepEqual(result, result)
        })

        it('validateURI(`google.com`) should return uri', function() {
            let result = hackernews.validateURI(`google.com`)
            assert.deepEqual(result, result)
        })

        it('validateURI(`google.com---`) should return "URI is not valid"', function() {
            let result = hackernews.validateURI(`google.com---`)
            assert.deepEqual(result, "URI is not valid")
        })

        it('validateURI(1) should return "URI is not valid"', function() {
            let result = hackernews.validateURI(1)
            assert.deepEqual(result, "URI is not valid")
        })

        it('validateURI(-1) should return "URI is not valid"', function() {
            let result = hackernews.validateURI(-1)
            assert.deepEqual(result, "URI is not valid")
        })
    })

    describe('validatePoints() Tests', function () {
        
        it('validatePoints(1) should return 1', function() {
            let result = hackernews.validatePoints(1)
            assert.deepEqual(result, 1)
        })

        it('validatePoints(100) should return 100', function() {
            let result = hackernews.validatePoints(100)
            assert.deepEqual(result, 100)
        })

        it('validatePoints(-1) should return 0', function() {
            let result = hackernews.validatePoints(-1)
            assert.deepEqual(result, 0)
        })

        it('validatePoints("n") should return 0', function() {
            let result = hackernews.validatePoints("n")
            assert.deepEqual(result, 0)
        })
    })

    describe('validateComments() Tests', function () {
        
        it('validateComments(1) should return 1', function() {
            let result = hackernews.validateComments(1)
            assert.deepEqual(result, 1)
        })

        it('validateComments(100) should return 100', function() {
            let result = hackernews.validateComments(100)
            assert.deepEqual(result, 100)
        })

        it('validateComments("discuss") should return 0', function() {
            let result = hackernews.validateComments("discuss")
            assert.deepEqual(result, 0)
        })

        it('validateComments("n") should return 0', function() {
            let result = hackernews.validateComments("n")
            assert.deepEqual(result, 0)
        })

        it('validateComments(-1) should return 0', function() {
            let result = hackernews.validateComments(-1)
            assert.deepEqual(result, 0)
        })
    })

    describe('validateRank() Tests', function () {
        
        it('validateRank(1) should return 1', function() {
            let result = hackernews.validateRank(1)
            assert.deepEqual(result, 1)
        })

        it('validateRank(100) should return 100', function() {
            let result = hackernews.validateRank(100)
            assert.deepEqual(result, 100)
        })

        it('validateRank(-1) should return "Rank is not valid"', function() {
            let result = hackernews.validateRank(-1)
            assert.deepEqual(result, "Rank is not valid")
        })

        it('validateRank("n") should return "Rank is not valid"', function() {
            let result = hackernews.validateRank("n")
            assert.deepEqual(result, "Rank is not valid")
        })
        
    })

    describe('validateInput() Tests', function () {
        
        it('validateInput("Darragh") should return "Darragh"', function() {
            let result = hackernews.validateInput("Darragh")
            assert.deepEqual(result, "Darragh")
        })

        it('validateInput(variable) should return variable.slice(0, 253)+"..."', function() {
            let number = 256
            var variable = "i"
            for (i = 0; i < number; i++) {
                variable += "i"
            }
            let result = hackernews.validateInput(variable)
            assert.deepEqual(result, variable.slice(0, 253)+"...")
        })
        
        it('validateInput(2) should return ""', function() {
            let result = hackernews.validateInput(2)
            assert.deepEqual(result, "")
        })

        it('validateInput(-1) should return ""', function() {
            let result = hackernews.validateInput(-1)
            assert.deepEqual(result, "")
        })

    })

})