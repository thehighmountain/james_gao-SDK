Lord of the Rings JS SDK Design Document
========================================

This document is intended to explain design and development decisions related to Lord of the Rings API wrapper.

---

* [Project Goals] (#project-goals)
* [Important Dependencies and Libraries] (#important-dependencies-and-libraries)
* [Endpoint Coverage] (#endpoint-coverage)
* [Code Examples] (#code-examples)

Project Goals
-------------

The primary goal of this project is to increase adoption and use of the API provided from LotR - Lord of the Rings.
LotR provides a platform where users can access information about the games and movies, and it can largely do everything the game UI can and more! We need to build a good platform and need to get people used to it.

Our goals for the LotR JS SDK are:

1. Giving the developers a seamless, easy access to the API endpoints, just only gated by a proper API key, so that they can be allowed to interact with the LotR backend system.
2. Provide a strong tool to be used as a third party integration.

Important Dependencies and Libraries
------------------------------------

* [isomorphic-unfetch] (https://github.com/developit/unfetch): A Promise based HTTP client for the browser and NodeJS
* [query-string] (https://github.com/sindresorhus/query-string): Library for parsing and stringifying URL query strings

Endpoint Coverage
-----------------

Currently, we are supporting 5 features for the LotR server endpoints

You can access movie and quote data using our SDK.

Code Examples
-------------

Import the SDK as follows

```javascript
const { LotR } = require("@jamesgao25/lotr");
const lotr = new LotR(API_KEY); // API_KEY is optional
```
> API key is optional, which means you are able to use read-only functions without it

Get all movies

```javascript
const lotr = new LotR(API_KEY);
const movies = await lotr.movies();
```

Get a movie by id

```javascript
const lotr = new LotR(API_KEY);
const movie = await lotr.movieById("123456789");
```

Get quotes from a movie

```javascript
const lotr = new LotR(API_KEY);
const movie = await lotr.movieById("123456789");
const quotes = movie.quotes()
```

Get all quotes

```javascript
const lotr = new LotR(API_KEY);
const quotes = await lotr.quotes();
```

Get a quote by id

```javascript
const lotr = new LotR(API_KEY);
const quote = await lotr.quoteById("123456789");
```
