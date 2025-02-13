---
title: 'Blog post 1 hello!'
date: '02-09-25T22:11'
description: 'This is a test'
---

 <p>We started using Nest.js as the main framework for our Node + Typescript service development, mainly because it has built-in configurations and ready to use project structure baked in with Typescript integration. Most importantly it contains to build and linting scripts which are quite hard to get right from scratch and it’s just working out of the box there.</p>

 <p>At https://treescale.com we have been always focused on having flexible ways of service development so that each service will be independent atomic for better scalability and ease of maintenance. That’s why from the beginning we just implemented JWT token-based auth so that we can embed the most commonly used information about individual HTTP requests and other services can just extract that using our JWT Secret keys. That sounds like a pretty standard way of doing things but still wanted to point out the way we did it and how simple the structure became when we moved everything into Cookies rather than saving in LocalStorage so that our UI now doesn’t send it over Authorization header. Everything works just by performing all requests to API over browser cookie, which is more secure by the way compared to Local Storage.</p>

 Nest.js consists of, so-called, atomic modules which are connected to the main application module with the Injectable Class principle. Well, that’s just a fancy way of saying there is a main module that calls all other modules to initialize them and share the same context and set middleware for Express.js which is the actual HTTP handler there. That is quite important to understand that at the end Express.js is the one who handles and processes the request, Nest.js is just a wrapper, which means all of the Express.js libraries are usable with Nest.js, including Passport.js and passport-jwt library, which is the basis for us here.