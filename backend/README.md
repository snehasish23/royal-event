# Royal STAR Event Management - Backend API

Secure, scalable backend API for Royal STAR Event Management built with Node.js, Express, and Supabase (PostgreSQL).

## 🚀 Features

- **RESTful API Architecture**
- **JWT Authentication** for admin access
- **Supabase PostgreSQL** database integration
- **Input Validation & Sanitization**
- **Secure endpoints** with helmet and CORS
- **Row Level Security (RLS)** in Supabase
- **CRUD operations** for events, blogs, enquiries, success stories
- **Fast & Scalable** architecture

## 📋 Prerequisites

- Node.js 18+ installed
- Supabase account and project
- npm or yarn package manager

## ⚙️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update with your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   JWT_SECRET=your_secret_key
   ```

4. **Setup database schema:**
   - Open your Supabase SQL Editor
   - Run the SQL from `database_schema.sql`

## 🏃‍♂️ Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile (requires auth)

### Events
- `GET /api/events` - Get all published events (public)
- `GET /api/events/:id` - Get single event (public)
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Blogs
- `GET /api/blogs` - Get all published blogs (public)
- `GET /api/blogs/:id` - Get single blog (public)
- `POST /api/blogs` - Create blog (admin only)
- `PUT /api/blogs/:id` - Update blog (admin only)
- `DELETE /api/blogs/:id` - Delete blog (admin only)

### Enquiries
- `POST /api/enquiries` - Submit enquiry (public)
- `GET /api/enquiries` - Get all enquiries (admin only)
- `GET /api/enquiries/:id` - Get single enquiry (admin only)
- `PUT /api/enquiries/:id` - Update enquiry status (admin only)
- `DELETE /api/enquiries/:id` - Delete enquiry (admin only)

### Success Stories
- `GET /api/success-stories` - Get all success stories (public)
- `GET /api/success-stories/:id` - Get single success story (public)
- `POST /api/success-stories` - Create success story (admin only)
- `PUT /api/success-stories/:id` - Update success story (admin only)
- `DELETE /api/success-stories/:id` - Delete success story (admin only)

## 🔐 Authentication

Admin endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📊 Data Models

### Event
```json
{
  "title": "string",
  "description": "string",
  "images": ["url1", "url2"],
  "event_date": "YYYY-MM-DD",
  "category": "wedding|corporate|cultural|birthday|other",
  "tags": ["tag1", "tag2"],
  "status": "draft|published|archived"
}
```

### Blog
```json
{
  "title": "string",
  "body": "string",
  "image": "url",
  "slug": "unique-slug",
  "meta_title": "string",
  "meta_description": "string",
  "meta_keywords": ["keyword1", "keyword2"],
  "status": "draft|published|archived"
}
```

### Enquiry
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "event_type": "string",
  "event_date": "YYYY-MM-DD",
  "guest_count": "number",
  "budget": "string",
  "message": "string",
  "status": "pending|contacted|in_progress|converted|closed"
}
```

### Success Story
```json
{
  "event_name": "string",
  "client_name": "string",
  "client_quote": "string",
  "outcome": "string",
  "images": ["url1", "url2"],
  "event_date": "YYYY-MM-DD",
  "category": "wedding|corporate|cultural|birthday|other"
}
```

## 🛡️ Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing protection
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation & sanitization
- **RLS** - Row Level Security in Supabase

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Supabase configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── eventController.js   # Events CRUD
│   ├── blogController.js    # Blogs CRUD
│   ├── enquiryController.js # Enquiries CRUD
│   └── successStoryController.js
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── errorHandler.js      # Error handling
│   └── validator.js         # Validation middleware
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── blogRoutes.js
│   ├── enquiryRoutes.js
│   └── successStoryRoutes.js
├── .env                     # Environment variables
├── .env.example             # Example environment file
├── server.js                # Main server file
├── database_schema.sql      # Database schema
└── package.json
```

## 🧪 Testing

Use Postman or any API client to test endpoints:

**Health Check:**
```bash
GET http://localhost:5000/health
```

**Register Admin:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "admin@royalstar.in",
  "password": "SecurePassword123",
  "name": "Admin User"
}
```

## 🔄 Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 5000) |
| NODE_ENV | Environment | No (default: development) |
| SUPABASE_URL | Supabase project URL | Yes |
| SUPABASE_ANON_KEY | Supabase anon key | Yes |
| SUPABASE_SERVICE_ROLE_KEY | Supabase service role key | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| JWT_EXPIRE | Token expiration | No (default: 7d) |
| ALLOWED_ORIGINS | CORS allowed origins | No |

## 📝 Notes

- All timestamps are in ISO 8601 format with timezone
- File uploads should be handled separately (use Supabase Storage)
- Run database schema before first use
- Keep `.env` file secure and never commit it

## 🤝 Contributing

1. Follow the existing code structure
2. Validate all inputs
3. Handle errors properly
4. Add comments for complex logic
5. Test endpoints before committing

## 📄 License

ISC

---

**Built with ❤️ for Royal STAR Event Management**
