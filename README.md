# DotPWeb

Application front-end and backend for the Defense of the Patience website

<sub>Project scaffold started from the article, [Building an Angular and Express App Part 1](http://start.jcolemorrison.com/building-an-angular-and-express-app-part-1/)(Current as of 2-5-2017).</sub>


### Install
* Clone the repo
* `cd DotPWeb && cd client` then `npm install` and then `bower install`
* `cd ../server` then `npm install`
* All set!

### Development

a) Run `grunt serve` in the `client` directory to up the client side Angular server

b) Run `grunt test` in the `client` directory to run the Karma test server

c) Run `npm run dev` in the `server` directory to startup the Express API

d) Run `grunt build` in the `client` directory to build down the Angular app into the `server`'s `dist` directory

e) Run `npm start` in the `server` directory after a `grunt build` to have the entire app brought together under the `server`.
