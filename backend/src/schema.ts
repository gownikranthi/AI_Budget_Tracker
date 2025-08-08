import { pgTable, uuid, text, decimal, timestamp, varchar, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description'),
  date: timestamp('date', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  color: varchar('color', { length: 7 }).notNull().default('#3B82F6'),
});

// Insert schemas
export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

// Types
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type SelectExpense = typeof expenses.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type SelectCategory = typeof categories.$inferSelect;