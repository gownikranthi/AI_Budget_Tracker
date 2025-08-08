# Personal Expense Tracker

## Overview
A full-stack personal expense tracker with React frontend, Express backend, and PostgreSQL database for comprehensive financial management. The project has been fully recovered and rebuilt from scratch after files were deleted.

## User Preferences
- Preferred communication style: Simple, everyday language
- Technical approach: Modern full-stack JavaScript with TypeScript
- Database: PostgreSQL with Drizzle ORM

## System Architecture
**Frontend (React + Vite)**
- Location: `client/` directory
- Framework: React 18 with TypeScript
- Routing: Wouter for client-side routing
- Styling: Tailwind CSS with custom shadcn/ui components
- State Management: TanStack Query for server state
- Main Pages: Dashboard, Expenses, Analytics, Categories

**Backend (Express + Node.js)**
- Location: `server/` directory
- Framework: Express.js with TypeScript
- Database: PostgreSQL with Drizzle ORM
- API Routes: RESTful endpoints for expenses, categories, and analytics
- File Structure:
  - `server/index.ts` - Main server entry point
  - `server/routes.ts` - API route definitions
  - `server/storage.ts` - Database interface and implementation

**Shared Types**
- Location: `shared/schema.ts`
- Database schema definitions using Drizzle
- Zod validation schemas for API requests
- TypeScript types for full-stack type safety

## Database Schema
- `expenses` table: Stores individual expense records with title, amount, category, description, date
- `categories` table: Manages expense categories with customizable colors
- Pre-populated with 8 default categories

## External Dependencies
- **Frontend**: React, Vite, TailwindCSS, TanStack Query, Wouter, React Hook Form, Zod, Lucide React
- **Backend**: Express, PostgreSQL, Drizzle ORM, TypeScript, TSX
- **Development**: TypeScript, ESLint, PostCSS, Autoprefixer

## Recent Changes (Aug 8, 2025)
- ✅ Rebuilt entire project structure after file deletion incident
- ✅ Created complete database schema with expenses and categories tables
- ✅ Implemented full-stack TypeScript architecture
- ✅ Built responsive React frontend with 4 main pages
- ✅ Set up Express API with CRUD operations
- ✅ Added sample categories to database
- ✅ Configured TypeScript, Tailwind, and build tools
- 🔄 Working on starting the development workflow

## Known Issues
- Need to configure workflow to run development server
- Some TypeScript path resolution issues to resolve
- Application ready for testing once server starts