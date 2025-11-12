# 🚀 Quick Setup Guide - Royal STAR Backend

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Fill in project details:
   - **Name**: Royal STAR Event Management
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your location
5. Wait for project to be created (~2 minutes)

## Step 2: Get Your Credentials

Once your project is ready:

1. Go to **Project Settings** (gear icon) → **API**
2. Copy the following:
   - **Project URL** → This is your `SUPABASE_URL`
   - **anon/public key** → This is your `SUPABASE_ANON_KEY`
   - **service_role key** → This is your `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep this secret!

## Step 3: Update .env File

Open `backend/.env` and update:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 4: Setup Database Schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy entire content from `backend/database_schema.sql`
4. Paste into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. Wait for "Success. No rows returned" message

## Step 5: Restart Backend Server

If the server is already running, it will auto-restart. Otherwise:

```bash
cd backend
npm run dev
```

You should see:
```
✅ Supabase connected successfully
🚀 Server is running on port 5000
```

## Step 6: Create First Admin Account

Use Postman or curl:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "admin@royalstar.in",
  "password": "YourSecurePassword123",
  "name": "Admin User"
}
```

Save the `token` from the response - you'll need it for admin operations!

## Step 7: Test the API

**Health Check:**
```bash
GET http://localhost:5000/health
```

**Create an Event (requires token):**
```bash
POST http://localhost:5000/api/events
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Grand Royal Wedding",
  "description": "A magnificent celebration",
  "category": "wedding",
  "status": "published"
}
```

## 🎉 You're All Set!

Your backend is now fully configured and ready to use!

### Next Steps:
- Import `postman_collection.json` into Postman for easy testing
- Connect your frontend to the backend
- Start creating events, blogs, and managing enquiries!

### Troubleshooting:

**Issue**: "Supabase not configured"
- **Solution**: Make sure .env file has valid Supabase credentials

**Issue**: "Invalid credentials" when logging in
- **Solution**: Make sure you registered an admin account first

**Issue**: "Policy violation" errors
- **Solution**: Run the database_schema.sql again to ensure RLS policies are set

### Support:
- Check `README.md` for full API documentation
- Review `database_schema.sql` for database structure
- Use Postman collection for API examples
