#!/usr/bin/env node

const fetch = require('node-fetch')         // Required to access the Hacker News HTML
const cheerio = require('cheerio')          // Required to obtain elements of the HTML
const commander = require('commander')      // Allows for custom input as required by the challenge


// Calculates num of pages (n / 30), that'll need to be queried to return desired num of posts (numberOfStories), 
// stores each value in array, which is then returned 
const getPagesArray = (numberOfStories) => {
    if (validateArg(numberOfStories) === true && typeof(numberOfStories) === "number") {
        let numberOfPages = Math.ceil(numberOfStories / 30)
        let pagesArray = []
        for (i = 0; i < numberOfPages; i++) {
            pagesArray.push(i + 1)
        }
        return pagesArray
    } else if  (validateArg(numberOfStories) == false && typeof(numberOfStories) === "number"){
        return "Please enter a number between 1 and 100"
    } else {
        return "Number of stories not valid input"
    }
}


// Fetches data from `https://news.ycombinator.com/news?p=${page}` given the (page) input and returns the
// response.text() in the form on html
const getPageHTML = (page) => {
    if (validatePage(page) === true) {
        return fetch(`https://news.ycombinator.com/news?p=${page}`)
        .then(response => response.text())
    } else {
        console.log("Input is invalid")
        process.exit()
    }
}
  

// Returns the combined HTML from looping through the Array returned from getPagesArray while also
// calling getPageHTML passing in each index of the array
const getHTML = async (numberOfStories) => {
    if (validateArg(numberOfStories) === true) {
        return Promise.all(getPagesArray(numberOfStories).map(getPageHTML))
        .then(response => response.join(''))
    } else {
        console.log("Please enter a value between 1 and 100")
        process.exit()
    }
}


// Takes in both the full rawHTML and posts needed to be returned, then using Cheerio, extracts the required info,
// checking that the data is valid, and then sets this within the Story object. Once set, pushes the object onto
// the stack if (stories.length < posts). Returns Stories []
const getStories = (rawHTML, posts) => {
    let stories = []
    let $ = cheerio.load(rawHTML)

    $('span.comhead').each(function() {
        let data = $(this).prev()

        let title = data.text()
        let uri = data.attr('href')
        let subtext = data.parent().parent().next().children('.subtext').children()
        let author = $(subtext).eq(1).text()
        let points = $(subtext).eq(0).text()
        let comments = $(subtext).eq(5).text()
        let rank = data.parent().parent().text()

        let story = {
            title: validateInput(title),
            uri: validateURI(uri),
            author: validateInput(author),
            points: validatePoints(points),
            comments: validateComments(comments),
            rank: validateRank(rank)
        }

        if (stories.length < posts) {
            stories.push(story)
        }
    })

    if (stories.length > 0) {
        return stories
    }
}


// Checking if the input value is between 1 and 100, which returns true - this will continue the script
// If the value is great than 100 or less than 1, the script will exit
const validateArg = (arg) => {
    if (arg > 0 && arg <= 100) {
        return true
    } else {
        return false
    }
}

// Checking if page > 0 and < 5
const validatePage = (page) => {
    if (page > 0 && page < 5) {
        return true
    } else {
        return false
    }
}

// Checking if the uri is valid based upon the given regex
const validateURI = (uri) => {
    let regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    if (regex.test(uri)) {
        return uri
    } else {
        return "URI is not valid"
    }
}

// Checking if points <= 0
const validatePoints = (points) => {
    if (parseInt(points) <= 0) {
        return 0
    } else {
        return parseInt(points)
    }
}

// Checking if comments is <= 0
const validateComments = (comments) => {
    if (parseInt(comments) <= 0 || comments === 'discuss') {
        return 0
    } else {
        return parseInt(comments)
    }
}

// Checking if rank is <= 0
const validateRank = (rank) => {
    if (parseInt(rank) <= 0) {
        return 0
    } else {
        return parseInt(rank)
    }
}

// Checking if the input is between 0 and 256
const validateInput = (input) => {
    if (input.length > 0 && input.length < 256){
      return input
    } else {
      return " -- Title either too short or too long."
    }
}

module.exports = {
    getPagesArray,
    getPageHTML,
    getHTML,
    getStories,
    validateArg,
    validatePage,
    validateURI,
    validatePoints,
    validateComments,
    validateRank,
    validateInput
}

// Commander fires off the script determined by the passed arguments
commander.allowUnknownOption().option('--posts [value]', 'Number of stories to display', 30).action(args =>
        getHTML(args.posts).then(rawHTML => 
            getStories(rawHTML, args.posts))
            .then(stories => {
                console.log(stories)
            })
            .catch(error => {
                console.log(error)
            })
        )

commander.parse(process.argv)