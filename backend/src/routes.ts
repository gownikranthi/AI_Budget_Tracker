import { Router, Request, Response } from 'express';
import { IStorage } from './storage.js';
import { insertExpenseSchema, insertCategorySchema } from './schema.js';
import { z } from 'zod';

export function createRoutes(storage: IStorage) {
  const router = Router();

  // Expenses routes
  router.get('/api/expenses', async (req: Request, res: Response) => {
    try {
      const { start, end } = req.query;
      
      if (start && end) {
        const expenses = await storage.getExpensesByDateRange(
          new Date(start as string),
          new Date(end as string)
        );
        res.json(expenses);
      } else {
        const expenses = await storage.getExpenses();
        res.json(expenses);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  });

  router.post('/api/expenses', async (req: Request, res: Response) => {
    try {
      const expenseData = insertExpenseSchema.parse(req.body);
      const expense = await storage.createExpense(expenseData);
      res.status(201).json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        console.error('Error creating expense:', error);
        res.status(500).json({ error: 'Failed to create expense' });
      }
    }
  });

  router.put('/api/expenses/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const expenseData = insertExpenseSchema.partial().parse(req.body);
      const expense = await storage.updateExpense(id, expenseData);
      res.json(expense);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Failed to update expense' });
      }
    }
  });

  router.delete('/api/expenses/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await storage.deleteExpense(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting expense:', error);
      res.status(500).json({ error: 'Failed to delete expense' });
    }
  });

  // Categories routes
  router.get('/api/categories', async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  router.post('/api/categories', async (req: Request, res: Response) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
      }
    }
  });

  router.delete('/api/categories/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await storage.deleteCategory(parseInt(id));
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  });

  // Analytics routes
  router.get('/api/analytics/by-category', async (req: Request, res: Response) => {
    try {
      const data = await storage.getExpensesByCategory();
      res.json(data);
    } catch (error) {
      console.error('Error fetching category analytics:', error);
      res.status(500).json({ error: 'Failed to fetch category analytics' });
    }
  });

  router.get('/api/analytics/monthly', async (req: Request, res: Response) => {
    try {
      const data = await storage.getMonthlyTotals();
      res.json(data);
    } catch (error) {
      console.error('Error fetching monthly analytics:', error);
      res.status(500).json({ error: 'Failed to fetch monthly analytics' });
    }
  });

  return router;
}