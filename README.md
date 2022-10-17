# Shortly
This is a web application where you can shorten internet links, built with NodeJS, Express and PostgreSQL. You can try the back-end here: https://shortly-back-api.herokuapp.com/

[Shortly.webm](https://user-images.githubusercontent.com/106849571/196081175-743453ab-b907-4272-9776-121444dccc40.webm)

## About
This is the back end for Shortly, a url shortener. Below are the implemented features:

- Sign up
- Login
- Persistent sessions using expirable JSON Web Tokens
- URL shortener using nanoid
- Open shortened URLs
- Visit count for URLs
- See personal data and your own URLs
- Delete URLs
- Show metrics for each user
- Ranking of top 10 users with the biggest total visit count

## Technologies
The following tools and frameworks were used in the construction of this project:
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens'>
</p>

## How to run
1. Create a root project folder called Shortly
```bash
mkdir Shortly
```
2. Clone this repository
3. Clone the front end repository at: https://github.com/rodrigocqb/Shortly-Front
4. Install dependencies
```bash
npm i
```
5. Create .env based on .env.example
6. Run the project
```bash
npm start
```
7. Follow the instructions to run the front end at: https://github.com/rodrigocqb/Shortly-Front
