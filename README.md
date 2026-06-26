# News Explorer Backend

This is the backend API for the News Explorer application. It allows users to register, sign in, and manage saved news articles.

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
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/news-explorer
JWT_SECRET=dev-secret
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

## Project Status

The backend has been tested successfully using terminal `curl` commands. Authentication, protected routes, article creation, and article deletion are working correctly.
