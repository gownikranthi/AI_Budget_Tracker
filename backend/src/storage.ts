import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { expenses, categories, SelectExpense, InsertExpense, SelectCategory, InsertCategory } from './schema.js';
import { eq, desc, between, sum, count } from 'drizzle-orm';

export interface IStorage {
  // Expenses
  getExpenses(): Promise<SelectExpense[]>;
  getExpensesByDateRange(startDate: Date, endDate: Date): Promise<SelectExpense[]>;
  createExpense(expense: InsertExpense): Promise<SelectExpense>;
  updateExpense(id: string, expense: Partial<InsertExpense>): Promise<SelectExpense>;
  deleteExpense(id: string): Promise<void>;
  
  // Categories
  getCategories(): Promise<SelectCategory[]>;
  createCategory(category: InsertCategory): Promise<SelectCategory>;
  deleteCategory(id: number): Promise<void>;
  
  // Analytics
  getExpensesByCategory(): Promise<{ category: string; total: string; count: number }[]>;
  getMonthlyTotals(): Promise<{ month: string; total: string }[]>;
}

export class DbStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    client.connect();
    this.db = drizzle(client);
  }

  async getExpenses(): Promise<SelectExpense[]> {
    return await this.db.select().from(expenses).orderBy(desc(expenses.date));
  }

  async getExpensesByDateRange(startDate: Date, endDate: Date): Promise<SelectExpense[]> {
    return await this.db
      .select()
      .from(expenses)
      .where(between(expenses.date, startDate, endDate))
      .orderBy(desc(expenses.date));
  }

  async createExpense(expense: InsertExpense): Promise<SelectExpense> {
    const [created] = await this.db.insert(expenses).values(expense).returning();
    return created;
  }

  async updateExpense(id: string, expense: Partial<InsertExpense>): Promise<SelectExpense> {
    const [updated] = await this.db
      .update(expenses)
      .set(expense)
      .where(eq(expenses.id, id))
      .returning();
    return updated;
  }

  async deleteExpense(id: string): Promise<void> {
    await this.db.delete(expenses).where(eq(expenses.id, id));
  }

  async getCategories(): Promise<SelectCategory[]> {
    return await this.db.select().from(categories).orderBy(categories.name);
  }

  async createCategory(category: InsertCategory): Promise<SelectCategory> {
    const [created] = await this.db.insert(categories).values(category).returning();
    return created;
  }

  async deleteCategory(id: number): Promise<void> {
    await this.db.delete(categories).where(eq(categories.id, id));
  }

  async getExpensesByCategory(): Promise<{ category: string; total: string; count: number }[]> {
    const result = await this.db
      .select({
        category: expenses.category,
        total: sum(expenses.amount),
        count: count(expenses.id),
      })
      .from(expenses)
      .groupBy(expenses.category);
    
    return result.map(row => ({
      category: row.category,
      total: row.total || '0',
      count: row.count,
    }));
  }

  async getMonthlyTotals(): Promise<{ month: string; total: string }[]> {
    // This would need to be adjusted based on your SQL dialect
    // For now, returning a simple implementation
    const result = await this.db
      .select({
        total: sum(expenses.amount),
      })
      .from(expenses);
    
    return result.map(row => ({
      month: new Date().toISOString().slice(0, 7),
      total: row.total || '0',
    }));
  }
}