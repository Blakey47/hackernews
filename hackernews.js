#!/usr/bin/env node

/*

I originally started working on this using the API that Hacker News provides.
Unfortunately, when experimenting with their API, I've determined that they
no longer provide the URL in the JSON that is returned to from each story.

Because of this, I've decided to use a web scrapper instead.

*/

const fetch = require('node-fetch')
var topStories = []
var storyList = []

async function getTopStoryIds() {
    let response = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
    let data = await response.json()
    topStories = data
}

async function getStoryDetails() {
    for (i = 0; i <= 25; i++) {
        let storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${topStories[i]}.json?print=pretty`)
        let storyData = await storyResponse.json()
        assignStory(storyData).then(story => {
            storyList.push(story)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return storyList
}

async function assignStory(storyData) {

    var story = {
        title: String,
        uri: String,
        author: String,
        points: Number,
        comments: Number,
        rank: Number
    }

    story.title = storyData.title
    story.uri = storyData.url
    story.author = storyData.by
    story.points = storyData.score
    if (storyData.kids != null) {
        story.comments = storyData.kids.length
    } else {
        story.comments = 0
    }
    story.rank = storyList.length + 1
    return story
}

getTopStoryIds().then(storyList => {
    getStoryDetails().then(storyList => {
        console.log(storyList)
    })
})