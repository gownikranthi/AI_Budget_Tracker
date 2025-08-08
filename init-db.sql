-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    color VARCHAR(7) NOT NULL DEFAULT '#3B82F6'
);

-- Insert default categories
INSERT INTO categories (name, color) VALUES
    ('Food & Dining', '#EF4444'),
    ('Transportation', '#3B82F6'),
    ('Entertainment', '#8B5CF6'),
    ('Shopping', '#EC4899'),
    ('Utilities', '#10B981'),
    ('Healthcare', '#06B6D4'),
    ('Education', '#F59E0B'),
    ('Other', '#84CC16')
ON CONFLICT (name) DO NOTHING;