# MatchaHire

MatchaHire is a minimal, clean, AI-powered hiring platform that replaces traditional job descriptions with interactive AI personas.

## Features

- Interactive AI personas for each role
- Smart question-answering via chat
- Resume upload and analysis
- Automated scoring and summaries
- Simple admin dashboard
- Email notifications

## Tech Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Supabase (Database & Storage)
- OpenAI GPT-4
- Nodemailer

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase, OpenAI, and email credentials

4. Set up Supabase:
   - Create a new project
   - Run the SQL migrations in `supabase/migrations`
   - Enable Storage for resume uploads

5. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and configurations
- `src/types/` - TypeScript type definitions

## Database Schema

See `supabase/migrations/` for the complete database schema.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 