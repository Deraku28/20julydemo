# Task 2: Database Schema & Supabase Setup - Instructions

## ✅ What's Been Completed

1. **Database Utility Functions** - Created `src/lib/database.ts` with:
   - `getSubmissionCount()` - Get total submission count
   - `submitInterest()` - Submit new interest form data

2. **Connection Test Utility** - Created `src/lib/test-connection.ts` with:
   - `testDatabaseConnection()` - Test database connectivity

3. **Updated TypeScript Types** - Updated `src/lib/supabase.ts` with correct types for `interest_submissions` table

4. **Test Page** - Created `src/app/test-db/page.tsx` for testing database operations

5. **SQL Setup Script** - Created `database-setup.sql` with all required database commands

## 🔧 Next Steps (Manual Setup Required)

### Step 1: Run Database Setup in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `database-setup.sql`
4. Click **Run** to execute all commands

### Step 2: Verify Database Setup

1. In Supabase dashboard, go to **Table Editor**
2. Verify that `interest_submissions` table exists with correct columns:
   - `id` (UUID, Primary Key)
   - `name` (VARCHAR(100), NOT NULL)
   - `email` (VARCHAR(255), UNIQUE, NOT NULL)
   - `subscribe_newsletter` (BOOLEAN, DEFAULT false)
   - `subscribe_updates` (BOOLEAN, DEFAULT false)
   - `subscribe_releases` (BOOLEAN, DEFAULT false)
   - `created_at` (TIMESTAMP WITH TIME ZONE)
   - `updated_at` (TIMESTAMP WITH TIME ZONE)

3. Check **Authentication > Policies** to verify RLS policies:
   - "Allow anonymous insert"
   - "Allow count read"

### Step 3: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/test-db`

3. Verify that:
   - Connection status shows "✅ Connected"
   - Submission count displays correctly
   - Test submission button works

## 📋 Success Criteria Checklist

- [ ] Database table `interest_submissions` exists with correct schema
- [ ] Indexes are created for performance (`idx_interest_submissions_email`, `idx_interest_submissions_created_at`)
- [ ] RLS policies allow anonymous inserts and count reads
- [ ] Database utility functions work correctly
- [ ] Connection test passes
- [ ] Error handling works for failed operations
- [ ] No unauthorized access possible

## 🧪 Testing Checklist

- [ ] Test anonymous form submission
- [ ] Test submission count retrieval
- [ ] Test duplicate email handling
- [ ] Test database connection failures
- [ ] Verify RLS policies work correctly
- [ ] Test error scenarios

## 🔍 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Ensure `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **"Table does not exist"**
   - Run the SQL commands in Supabase SQL Editor

3. **"RLS policy violation"**
   - Check that RLS policies are created correctly in Supabase dashboard

4. **"Connection failed"**
   - Verify Supabase URL and anon key are correct
   - Check if Supabase project is active

## 📁 Files Created/Modified

- ✅ `src/lib/database.ts` - Database utility functions
- ✅ `src/lib/test-connection.ts` - Connection testing utility
- ✅ `src/lib/supabase.ts` - Updated with correct types
- ✅ `src/app/test-db/page.tsx` - Test page for verification
- ✅ `database-setup.sql` - SQL commands for database setup

## 🚀 Ready for Task 3

Once you've completed the database setup and verified everything works, you're ready to proceed to **Task 3: Core Components & Types** where you'll create reusable TypeScript types and UI components for the interest submission form. 