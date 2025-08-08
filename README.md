# Personal Expense Tracker

A full-stack personal expense tracker with React frontend, Express backend, and PostgreSQL database for comprehensive financial management.

## Project Structure

```
├── frontend/           # React + Vite frontend application
│   ├── src/           # Source code
│   ├── components/    # Reusable UI components
│   ├── lib/          # Utilities and configurations
│   ├── hooks/        # Custom React hooks
│   └── Dockerfile    # Frontend Docker configuration
├── backend/           # Express + Node.js backend API
│   ├── src/          # Source code
│   ├── server.ts     # Main server file
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database layer
│   ├── schema.ts     # Database schema and types
│   └── Dockerfile    # Backend Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── init-db.sql       # Database initialization script
└── README.md         # This file
```

## Features

- **Dashboard**: Overview with expense totals and recent transactions
- **Expenses**: Add, view, edit, and delete expenses
- **Analytics**: Spending insights with category breakdowns and charts
- **Categories**: Manage expense categories with custom colors
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your system

### Running the Application

1. **Clone and navigate to the project directory**
   ```bash
   git clone <your-repo-url>
   cd expense-tracker
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Database: PostgreSQL on localhost:5432

### Services

The application consists of three main services:

- **postgres**: PostgreSQL database with automatic initialization
- **backend**: Express.js API server (port 3001)
- **frontend**: React + Vite development server (port 5173)

### Environment Configuration

Copy the example environment file and customize if needed:
```bash
cp .env.example .env
```

## Development

### Local Development Without Docker

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Database Setup
Make sure PostgreSQL is running and create the database:
```sql
CREATE DATABASE expensetracker;
```

Then run the initialization script from `init-db.sql`.

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `DELETE /api/categories/:id` - Delete category

### Analytics
- `GET /api/analytics/by-category` - Get expenses grouped by category
- `GET /api/analytics/monthly` - Get monthly spending totals

## Database Schema

### Expenses Table
- `id` (UUID) - Primary key
- `title` (TEXT) - Expense title
- `amount` (DECIMAL) - Amount spent
- `category` (VARCHAR) - Category name
- `description` (TEXT) - Optional description
- `date` (TIMESTAMP) - Date of expense
- `created_at` (TIMESTAMP) - Record creation time

### Categories Table
- `id` (SERIAL) - Primary key
- `name` (VARCHAR) - Category name (unique)
- `color` (VARCHAR) - Hex color code

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Wouter (routing)
- TanStack Query (data fetching)
- React Hook Form
- Recharts (analytics)

### Backend
- Node.js
- Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- Zod (validation)

### Infrastructure
- Docker & Docker Compose
- PostgreSQL 15

## Production Deployment

For production deployment, you may want to:

1. Use a managed PostgreSQL service
2. Update environment variables for production URLs
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Use Docker secrets for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.