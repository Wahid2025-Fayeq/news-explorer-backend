# News Explorer Backend

This is the backend API for the News Explorer application. It allows users to register, sign in, and manage saved news articles.

## Live Links

Backend API:
https://mine.bz.jumpingcrab.com/api/

Frontend Repository:
https://github.com/Wahid2025-Fayeq/news-explorer-frontend

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- Celebrate/Joi validation
- dotenv
- CORS
- PM2
- NGINX
- Google Cloud Platform (GCP)

## Features

- User registration
- User login
- JWT-based authorization
- Protected routes
- Get current user information
- Save news articles
- Get saved articles
- Delete saved articles

## Running the Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run start
```

Start the server with hot reload:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/news-explorer
JWT_SECRET=your-secret-key
```

## API Routes

### Public Routes

#### GET `/`

Checks that the API is running.

#### POST `/signup`

Creates a new user.

Request body:

```json
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Wahid"
}
```

#### POST `/signin`

Logs in a user and returns a JWT token.

Request body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Protected Routes

Protected routes require this header:

```http
Authorization: Bearer <token>
```

#### GET `/users/me`

Returns the current logged-in user.

#### GET `/articles`

Returns all saved articles for the current user.

#### POST `/articles`

Creates a saved article.

Request body:

```json
{
  "keyword": "technology",
  "title": "OpenAI releases a new model",
  "text": "This is a test article.",
  "date": "2026-06-26",
  "source": "OpenAI News",
  "link": "https://example.com/article",
  "image": "https://example.com/image.jpg"
}
```

#### DELETE `/articles/:articleId`

Deletes a saved article by ID.

## Testing

The backend API has been tested successfully using both the Postman application and terminal `curl` commands.

The following endpoints were verified:

- User registration (`POST /signup`)
- User authentication (`POST /signin`)
- Get current user (`GET /users/me`)
- Create article (`POST /articles`)
- Get saved articles (`GET /articles`)
- Delete article (`DELETE /articles/:articleId`)

Authentication, protected routes, article creation, article retrieval, and article deletion are all functioning correctly.

## Deployment

The backend is deployed on a Google Cloud virtual machine using PM2 as the process manager and NGINX as the reverse proxy. HTTPS is configured using SSL certificates.
