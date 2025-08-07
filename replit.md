# ExpenseTracker - Personal Finance Management Application

## Overview

ExpenseTracker is a full-stack personal finance management application built with React, Express, and PostgreSQL. The application enables users to track their expenses, manage budgets, and analyze spending patterns through an intuitive dashboard. It features modern Material Design-inspired UI components, comprehensive expense categorization, and real-time data visualization.

The application follows a clean architecture with clear separation between frontend and backend concerns, utilizing modern web development practices including TypeScript, Drizzle ORM for database operations, and React Query for efficient data fetching and state management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development experience
- **Build System**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing with support for authenticated and public routes
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Custom component library based on Radix UI primitives with Tailwind CSS for styling
- **Design System**: Material Design-inspired theming with CSS custom properties for consistent visual hierarchy
- **Form Handling**: React Hook Form with Zod validation for robust form management and data validation

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Authentication**: Replit OpenID Connect (OIDC) integration with session-based authentication
- **Session Management**: PostgreSQL-backed session storage using connect-pg-simple
- **API Design**: RESTful API endpoints with consistent error handling and request logging
- **Data Validation**: Zod schemas shared between frontend and backend for consistent validation

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless connection pooling
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Core Tables**:
  - Users table for authentication and profile management
  - Expenses table with category enumeration and decimal precision for amounts
  - Budgets table for spending limits and financial goals
  - Sessions table for authentication state management
- **Data Integrity**: Foreign key relationships and proper indexing for performance

### Authentication & Authorization
- **Provider**: Replit OIDC integration for seamless authentication in the Replit environment
- **Session Strategy**: Server-side sessions with PostgreSQL storage for security
- **Route Protection**: Middleware-based authentication checks on API endpoints
- **User Management**: Automatic user creation and profile synchronization from OIDC claims

### Development & Build Process
- **Development**: Hot module reloading with Vite and Express server integration
- **TypeScript**: Comprehensive type checking across frontend, backend, and shared schemas
- **Path Mapping**: Absolute imports with @ aliases for clean import statements
- **Build Process**: Separate frontend (Vite) and backend (esbuild) build pipelines
- **Asset Management**: Static asset serving with development and production configurations

## External Dependencies

### Core Infrastructure
- **@neondatabase/serverless**: Serverless PostgreSQL connection with WebSocket support for edge deployments
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect for database operations
- **drizzle-kit**: Schema management and migration tooling

### Authentication & Session Management
- **openid-client**: OpenID Connect client implementation for Replit authentication
- **passport**: Authentication middleware with OIDC strategy
- **express-session**: Session middleware for Express
- **connect-pg-simple**: PostgreSQL session store integration

### Frontend Libraries
- **@tanstack/react-query**: Server state management with intelligent caching and background updates
- **wouter**: Lightweight React router for client-side navigation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Form validation resolvers for Zod integration

### UI Components & Styling
- **@radix-ui/react-***: Comprehensive collection of accessible, unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Modern icon library with tree-shaking support

### Development & Build Tools
- **vite**: Fast build tool with Hot Module Replacement for development
- **@vitejs/plugin-react**: React support for Vite
- **esbuild**: Fast JavaScript bundler for backend build process
- **tsx**: TypeScript execution engine for development server
- **@replit/vite-plugin-runtime-error-modal**: Development error handling for Replit environment