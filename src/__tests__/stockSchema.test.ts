import { describe, it, expect } from 'vitest';
import { stockFormSchema } from '../schemas/stockSchema';

describe('Stock Form Schema Validation', () => {
  it('should validate a valid stock form', () => {
    const validData = {
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.0,
      currentPrice: 160.0,
      dateOfPurchase: '2024-01-01',
    };

    const result = stockFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should transform ticker to uppercase', () => {
    const data = {
      ticker: 'aapl',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.0,
      dateOfPurchase: '2024-01-01',
    };

    const result = stockFormSchema.safeParse(data);
    if (result.success) {
      expect(result.data.ticker).toBe('AAPL');
    }
  });

  it('should reject invalid ticker format', () => {
    const invalidData = {
      ticker: 'aa$pl',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.0,
      dateOfPurchase: '2024-01-01',
    };

    const result = stockFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject negative quantity', () => {
    const invalidData = {
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: -5,
      purchasePrice: 150.0,
      dateOfPurchase: '2024-01-01',
    };

    const result = stockFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject zero or negative purchase price', () => {
    const invalidData = {
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 0,
      dateOfPurchase: '2024-01-01',
    };

    const result = stockFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject future dates', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    
    const invalidData = {
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.0,
      dateOfPurchase: futureDate.toISOString().split('T')[0],
    };

    const result = stockFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept optional current price', () => {
    const dataWithoutCurrentPrice = {
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.0,
      dateOfPurchase: '2024-01-01',
    };

    const result = stockFormSchema.safeParse(dataWithoutCurrentPrice);
    expect(result.success).toBe(true);
  });

  it('should reject empty company name', () => {
    const invalidData = {
      ticker: 'AAPL',
      companyName: '',
      quantity: 10,
      purchasePrice: 150.0,
      dateOfPurchase: '2024-01-01',
    };

    const result = stockFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
