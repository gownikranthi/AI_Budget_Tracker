import {
  users,
  expenses,
  budgets,
  type User,
  type UpsertUser,
  type Expense,
  type InsertExpense,
  type Budget,
  type InsertBudget,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, sum, count } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Expense operations
  createExpense(userId: string, expense: InsertExpense): Promise<Expense>;
  getExpensesByUserId(userId: string, limit?: number): Promise<Expense[]>;
  getExpenseById(id: string): Promise<Expense | undefined>;
  updateExpense(id: string, expense: Partial<InsertExpense>): Promise<Expense>;
  deleteExpense(id: string): Promise<void>;
  getExpensesByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Expense[]>;
  getExpensesByCategory(userId: string, category: string): Promise<Expense[]>;
  
  // Budget operations
  createBudget(userId: string, budget: InsertBudget): Promise<Budget>;
  getBudgetsByUserId(userId: string): Promise<Budget[]>;
  getBudgetByUserIdAndCategoryAndMonth(userId: string, category: string, month: string): Promise<Budget | undefined>;
  updateBudget(id: string, budget: Partial<InsertBudget>): Promise<Budget>;
  deleteBudget(id: string): Promise<void>;
  
  // Analytics operations
  getMonthlyExpenseTotal(userId: string, month: string): Promise<number>;
  getCategoryTotals(userId: string, startDate: Date, endDate: Date): Promise<Array<{ category: string; total: number }>>;
  getDailyExpenseTotals(userId: string, startDate: Date, endDate: Date): Promise<Array<{ date: string; total: number }>>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Expense operations
  async createExpense(userId: string, expense: InsertExpense): Promise<Expense> {
    const [newExpense] = await db
      .insert(expenses)
      .values({ ...expense, userId })
      .returning();
    return newExpense;
  }

  async getExpensesByUserId(userId: string, limit = 50): Promise<Expense[]> {
    return await db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, userId))
      .orderBy(desc(expenses.date))
      .limit(limit);
  }

  async getExpenseById(id: string): Promise<Expense | undefined> {
    const [expense] = await db.select().from(expenses).where(eq(expenses.id, id));
    return expense;
  }

  async updateExpense(id: string, expense: Partial<InsertExpense>): Promise<Expense> {
    const [updatedExpense] = await db
      .update(expenses)
      .set({ ...expense, updatedAt: new Date() })
      .where(eq(expenses.id, id))
      .returning();
    return updatedExpense;
  }

  async deleteExpense(id: string): Promise<void> {
    await db.delete(expenses).where(eq(expenses.id, id));
  }

  async getExpensesByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Expense[]> {
    return await db
      .select()
      .from(expenses)
      .where(
        and(
          eq(expenses.userId, userId),
          gte(expenses.date, startDate),
          lte(expenses.date, endDate)
        )
      )
      .orderBy(desc(expenses.date));
  }

  async getExpensesByCategory(userId: string, category: string): Promise<Expense[]> {
    return await db
      .select()
      .from(expenses)
      .where(
        and(
          eq(expenses.userId, userId),
          eq(expenses.category, category as any)
        )
      )
      .orderBy(desc(expenses.date));
  }

  // Budget operations
  async createBudget(userId: string, budget: InsertBudget): Promise<Budget> {
    const [newBudget] = await db
      .insert(budgets)
      .values({ ...budget, userId })
      .returning();
    return newBudget;
  }

  async getBudgetsByUserId(userId: string): Promise<Budget[]> {
    return await db
      .select()
      .from(budgets)
      .where(eq(budgets.userId, userId))
      .orderBy(desc(budgets.month));
  }

  async getBudgetByUserIdAndCategoryAndMonth(userId: string, category: string, month: string): Promise<Budget | undefined> {
    const [budget] = await db
      .select()
      .from(budgets)
      .where(
        and(
          eq(budgets.userId, userId),
          eq(budgets.category, category as any),
          eq(budgets.month, month)
        )
      );
    return budget;
  }

  async updateBudget(id: string, budget: Partial<InsertBudget>): Promise<Budget> {
    const [updatedBudget] = await db
      .update(budgets)
      .set({ ...budget, updatedAt: new Date() })
      .where(eq(budgets.id, id))
      .returning();
    return updatedBudget;
  }

  async deleteBudget(id: string): Promise<void> {
    await db.delete(budgets).where(eq(budgets.id, id));
  }

  // Analytics operations
  async getMonthlyExpenseTotal(userId: string, month: string): Promise<number> {
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    
    const result = await db
      .select({ total: sum(expenses.amount) })
      .from(expenses)
      .where(
        and(
          eq(expenses.userId, userId),
          gte(expenses.date, startDate),
          lte(expenses.date, endDate)
        )
      );
    
    return Number(result[0]?.total || 0);
  }

  async getCategoryTotals(userId: string, startDate: Date, endDate: Date): Promise<Array<{ category: string; total: number }>> {
    const result = await db
      .select({
        category: expenses.category,
        total: sum(expenses.amount)
      })
      .from(expenses)
      .where(
        and(
          eq(expenses.userId, userId),
          gte(expenses.date, startDate),
          lte(expenses.date, endDate)
        )
      )
      .groupBy(expenses.category);
    
    return result.map(row => ({
      category: row.category,
      total: Number(row.total || 0)
    }));
  }

  async getDailyExpenseTotals(userId: string, startDate: Date, endDate: Date): Promise<Array<{ date: string; total: number }>> {
    const result = await db
      .select({
        date: expenses.date,
        total: sum(expenses.amount)
      })
      .from(expenses)
      .where(
        and(
          eq(expenses.userId, userId),
          gte(expenses.date, startDate),
          lte(expenses.date, endDate)
        )
      )
      .groupBy(expenses.date)
      .orderBy(expenses.date);
    
    return result.map(row => ({
      date: row.date.toISOString().split('T')[0],
      total: Number(row.total || 0)
    }));
  }
}

export const storage = new DatabaseStorage();
