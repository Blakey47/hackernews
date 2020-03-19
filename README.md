## Hacker News - Web Scraper

![Node.js](https://img.shields.io/badge/Framework-Node.js-green)
![Fetch](https://img.shields.io/badge/Libraries-Fetch-blue)
![Cheerio](https://img.shields.io/badge/Libraries-Cheerio-blue)
![Commander](https://img.shields.io/badge/Libraries-Commander-blue)
![Mocha&Chai](https://img.shields.io/badge/Libraries-Mocha&Chai-blue)
![Out of this world](https://img.shields.io/badge/Fun-Out%20of%20this%20world-red)

A  CLI web scraper built with Node.js that retrieves top stories from Y Combinators Hacker News. Given the value n as input from the user, the program will return between 1 and 100 stories.

## Important Notes

I had never worked with Node.js or any of these libraries before this challenge as I'm used to building scripts in Python while also having experience writing scripts with Swift. With that said, I decided to work with Node.js due to the requirements of the role and the emphasis on learning new technologies.

Also, I had originally started work on retrieving the desired information via the API that is provided by Hacker News but it appears as though the returned JSON no longer provides a valid URI.

## Installation

Within the directory of your choosing:

```
git clone git@github.com:Blakey47/hackernews.git
```

CD into the hackernews directory:

```
cd hackernews
```

Install the project:

```
npm run install-hackernews
```

## Execution

Example how to run the script:

```
// --posts arg must be between 1 and 100
hackernews --posts 15
```

## Libraries

One thing to note about my library choices is that some of them were chosen simply because I decided to learn these libraries as part of learning Node.js for this challenge - changes would be made if I remade the project.

### Fetch

I've decided to use Fetch over Axios, or any other HTTP request libraries, due to the readability of fetch to those that may not have used Javascript before - key word `fetch` is rather explanatory followed by the `response.text()` return.

I had attempted to work with Axios but hadn't originally understood why all data was returned in a `data` key. After some research it appears as Axios is far better at handling exceptions and I would implement this library if I had to do it again.

### Cheerio

Cheerio appears to be the defacto library choice when it comes HTML elements selection within the Node.js world and this is honestly the reason why I've chosen it.

I've also taken a look at [Himalaya](https://github.com/andrejewski/himalaya), [htmlparser2](https://github.com/fb55/htmlparser2) and [parse5](https://github.com/inikulin/parse5) alternatives but decided to go with Cheerio for the above reason.

### Commander

While learning to build scripts with Node.js for the first time, I found a lot of information on Commander which coerced me into working with the library. I've also taken a look into [Yargs](https://github.com/yargs/yargs) which appears to have a great community with regular updates every 12 days so it would certainly be my choice if I decided to remake this project.

### Mocha & Chai

I've chosen these testing libraries for their simplicity yet powerful abilities. The ability to simply be able to compare absolute values by means of `assert.deepEqual` is great and allowed me to create many different tests at great speeds.
