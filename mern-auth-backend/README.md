# MERN Authentication Backend

A complete authentication backend API built with Node.js, Express, and MongoDB. Features JWT-based authentication with secure password hashing.

## Features

✅ User Registration with validation
✅ User Login with JWT tokens
✅ Protected routes with middleware
✅ Password hashing with bcryptjs
✅ MongoDB Atlas integration
✅ CORS enabled
✅ Error handling
✅ Environment configuration
✅ Deployment ready

## Project Structure

```
mern-auth-backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── authController.js  # Auth logic (register, login, profile)
├── middleware/
│   └── auth.js            # JWT verification middleware
├── models/
│   └── User.js            # User schema and methods
├── routes/
│   └── authRoutes.js      # API routes
├── server.js              # Entry point
├── package.json           # Dependencies
├── .env                   # Environment variables (local)
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB Atlas

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and database
3. Get your connection URI

### 3. Configure Environment Variables

Create `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-auth?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

Replace with your actual MongoDB URI and generate a strong JWT secret.

## Running the Server

### Development (with hot reload)

```bash
npm run dev
```

### Production

```bash
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### 1. Register User

**POST** `/api/auth/register`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response (201):

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login User

**POST** `/api/auth/login`

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 3. Get User Profile (Protected)

**GET** `/api/auth/profile`

Headers:

```
Authorization: Bearer eyJhbGc...
```

Response (200):

```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Health Check

**GET** `/api/health`

Response (200):

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Testing with Postman

1. **Register**: POST `http://localhost:5000/api/auth/register`
   - Body (raw JSON): name, email, password

2. **Login**: POST `http://localhost:5000/api/auth/login`
   - Body (raw JSON): email, password
   - Copy the token from response

3. **Get Profile**: GET `http://localhost:5000/api/auth/profile`
   - Headers: `Authorization: Bearer <your_token>`

## Key Files Explained

### `server.js`

- Express app initialization
- Middleware setup (JSON parser, CORS, logging)
- Route mounting
- Server startup on port 5000

### `config/db.js`

- MongoDB connection function
- Uses Mongoose with modern options
- Handles connection errors gracefully

### `models/User.js`

- Mongoose user schema
- Email uniqueness and validation
- Pre-save hook to hash passwords
- Instance method to compare passwords

### `middleware/auth.js`

- Protects routes requiring authentication
- Verifies JWT tokens
- Extracts user ID from token

### `controllers/authController.js`

- `register`: Creates new user with validation
- `login`: Authenticates user and returns token
- `getProfile`: Returns authenticated user info

### `routes/authRoutes.js`

- Public routes: register, login
- Protected route: profile (requires valid token)

## Security Features

✅ **Password Hashing**: bcryptjs with salt rounds
✅ **JWT Tokens**: Secure token-based authentication
✅ **Input Validation**: Email and password validation
✅ **No Password Exposure**: Password excluded from queries by default
✅ **CORS**: Cross-origin requests configured
✅ **Error Messages**: Generic error responses for security

## Environment Variables

| Variable     | Description               | Example                       |
| ------------ | ------------------------- | ----------------------------- |
| `NODE_ENV`   | Environment mode          | `development` or `production` |
| `PORT`       | Server port               | `5000`                        |
| `MONGO_URI`  | MongoDB connection string | MongoDB Atlas URI             |
| `JWT_SECRET` | JWT signing key           | Strong random string          |
| `JWT_EXPIRE` | Token expiration          | `7d`                          |

## Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy automatically on each push

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid credentials or token)
- `404`: Not Found
- `500`: Server Error

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **dotenv**: Environment variable management
- **cors**: Cross-origin resource sharing

## Future Enhancements

- Email verification
- Password reset functionality
- Refresh tokens
- Role-based access control
- Rate limiting
- Request validation with Joi
- API documentation with Swagger

## License

ISC

## Author

Your Name
