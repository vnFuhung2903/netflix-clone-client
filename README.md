# Netflix clone

A web app allows users to watch movies, tv shows on an internet-connected device. This repository only contains the **_frontend_** code. The **_backend_** code is in the [backend repository](https://github.com/vnFuhung2903/netflix-clone-server).

Demo: [Netflixbyvnfuhung2903](https://netflixbyvnfuhung2903.vercel.app)

## Preview

![Screenshot 2024-01-01 071254](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/6323f730-7349-47fc-be95-70ad832317d2)

![Screenshot 2024-01-01 071129](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/833b09a0-2687-47ed-8cf1-6efa961df632)

![Screenshot 2024-01-01 070926](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/ea327f90-cc4d-41e1-a0d1-523d85ffd3cc)

![Screenshot 2024-01-01 070956](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/1436b554-9879-47f8-a38e-089cbe6eda81)

![Screenshot 2023-12-31 183608](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/af97ecfe-421b-46cf-84ba-d42dc4bc29c4)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [License](#license)

## Project Overview

The project is a fullstack web application built using MERN (MongoDB, Express.js, React.js, Node.js) stack. Movies and tv shows data is retrieved from TMDB (themoviedb). 

### API Links

Here are the links to the TMDB API:

- For [registering for an API key](https://www.themoviedb.org/settings/api)
- For [API Reference](https://developer.themoviedb.org/reference)

## Features

- User authentication and authorization (JWT)
- User profile creation and management
- Watch movies, tv shows (trailers, teasers, ...)
- Add movies, tv shows to user's favourite list, user's recently watchlist
- Remove movies, tv shows from user's list
- Search movies, tv shows by key word, genres, ...

## Technologies

#### Frontend

- React.js
- React router
- SASS/SCSS
- Swiper.js
- Axios
- Fontawesome

#### Backend

- MongoDB
- Express.js
- Node.js
- JWT
- Bcrypt
- Mongoose

## Getting started

### Prerequisites

Before running this application, make sure you have:

- Node.js installed
- MongoDB account
- API key from TMDB

### Installation

1. Clone the repository using `git clone`
2. Install required dependencies using `npm ci`
3. Create a `.env` file for both the frontend and backend

#### Frontend

```bash
REACT_APP_API_KEY= your TMDB API key
```

#### Backend

```bash
MONGODB_PASSWORD= your MongoDB password
PORT= your server port
REFRESH_TOKEN_SECRET= your secret key to generate token
```

4. Start the backend using `npm run start`
5. Start the frontend using `npm start`

## License

This project is licensed under the [MIT License](LICENSE).
