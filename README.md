# MatchaHire

AI-powered hiring platform that connects talented professionals with mission-driven companies.

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+
- Git

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/avssr/matcha-hire.git
cd matcha-hire
```

2. Run the setup script:
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

3. Start the development environment:
```bash
npm run docker:dev
```

The application will be available at http://localhost:3000

### Environment Variables

Copy `.env.example` to `.env` and update the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Project Structure

```
matchahire/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable components
│   ├── lib/          # Utility functions and configurations
│   └── types/        # TypeScript type definitions
├── public/           # Static assets
├── scripts/         # Development and deployment scripts
├── supabase/        # Database migrations and seeds
└── tests/          # Test files
```

## Development Workflow

1. Pull latest changes:
```bash
git pull origin main
```

2. Install dependencies:
```bash
npm install
```

3. Run database migrations:
```bash
npm run db:migrate
```

4. Start development server:
```bash
npm run dev
```

## Testing

Run tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

## Database Management

- Generate migration:
```bash
npm run db:generate
```

- Apply migrations:
```bash
npm run db:migrate
```

- Reset database with seed data:
```bash
npm run db:seed
```

## Contributing

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push changes:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## License

MIT 