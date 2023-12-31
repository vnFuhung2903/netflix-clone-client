# Netflix clone using MERN by vnFuhung2903

A movie app allows users to watch movies, tv shows on an internet-connected device. This repository only contains the **_frontend_** code.
The **_backend_** code is in the [backend repository](https://github.com/vnFuhung2903/netflix-clone-server)

Demo: [Netflixbyvnfuhung2903](https://netflixbyvnfuhung2903.vercel.app)

## Preview

![Screenshot 2023-12-31 183430](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/e57e0605-268e-45fa-8f15-587985c6a33f)

![Screenshot 2023-12-31 183456](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/a296531f-31f0-4da2-bf75-b06e786e893b)

![Screenshot 2023-12-31 183626](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/758e0a19-e2c3-4d69-99eb-c9938160ee5c)

![Screenshot 2023-12-31 183517](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/a818b8ae-a6ee-4d06-b17f-861421b2007b)

![Screenshot 2023-12-31 183547](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/5669bc89-955f-45bb-bb8c-6b28d9bce088)

![Screenshot 2023-12-31 183608](https://github.com/vnFuhung2903/netflix-clone-client/assets/105798742/af97ecfe-421b-46cf-84ba-d42dc4bc29c4)

## Table of content

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [License](#license)

## Project Overview

The project is a fullstack app built using MERN (MongoDB, Express.js, React.js, Node.js) stack. Movies and tv shows data is retrieved from TMDB (themoviedb). 

### API Links

Here are the links of the TMDB API:

- For [registering for an API Key](https://www.themoviedb.org/settings/api)
- For [API reference](https://developer.themoviedb.org/reference)

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

This project is licensed under the [MIT License](https://github.com/vnFuhung2903/netflix-clone-client/blob/main/LICENSE)
