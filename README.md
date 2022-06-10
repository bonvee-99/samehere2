# Same Here
**Website**:link:: [Same Here](same-here.herokuapp.com)
<img width="1439" alt="Screen Shot 2022-06-09 at 10 06 40 PM" src="https://user-images.githubusercontent.com/73202642/172994616-417de21f-c09c-415a-b598-6794ae4eaac1.png">

## Overview
!!!

## Features
- register an accoount and login
- create posts and comment on others
- access a compilation of useful links and resources

## Tech Stack
**Client**: JavaScript (React), Bootstrap

**Server**: JavaScript (Node.js), PostgreSQL, Heroku

### Register Page

<img width="1438" alt="Screen Shot 2022-06-09 at 10 09 16 PM" src="https://user-images.githubusercontent.com/73202642/172994655-e7059766-24ef-4719-bbbc-346b8910b578.png">

### Home Page

<img width="1440" alt="Screen Shot 2022-06-09 at 10 06 54 PM" src="https://user-images.githubusercontent.com/73202642/172994662-1b8f6a9d-df02-40f8-9f2b-005dca9aa6b1.png">

### Setup
- cd client and run npm install
- run npm run start
- cd server and run npm install
- must create a database locally using database.sql, an email for verification pushing, and also a .env file with corresponding fields:
  - jwtSecret
  - emailSecret
  - GMAIL_USER
  - GMAIL_PASS
  - PG_USER
  - PG_PASSWORD
  - PG_HOST
  - PG_PORT
  - PG_DATABASE
- run npm run dev


