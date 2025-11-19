import { describe, it, expect, beforeEach } from 'vitest';
import { usePortfolioStore } from '../store/portfolioStore';
import type { StockFormData } from '../types/stock.types';

describe('Portfolio Store', () => {
  beforeEach(() => {
    // Reset store before each test
    usePortfolioStore.setState({ stocks: [] });
  });

  it('should add a stock', () => {
    const store = usePortfolioStore.getState();
    const newStock: StockFormData = {
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.0,
      currentPrice: 160.0,
      dateOfPurchase: '2024-01-01',
    };

    store.addStock(newStock);

    const stocks = usePortfolioStore.getState().stocks;
    expect(stocks).toHaveLength(1);
    expect(stocks[0].ticker).toBe('AAPL');
    expect(stocks[0].companyName).toBe('Apple Inc.');
  });

  it('should edit a stock', () => {
    const store = usePortfolioStore.getState();
    
    // Add initial stock
    store.addStock({
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.0,
      currentPrice: 160.0,
      dateOfPurchase: '2024-01-01',
    });

    const stockId = usePortfolioStore.getState().stocks[0].id;

    // Edit the stock
    store.editStock(stockId, {
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 20,
      purchasePrice: 150.0,
      currentPrice: 170.0,
      dateOfPurchase: '2024-01-01',
    });

    const stocks = usePortfolioStore.getState().stocks;
    expect(stocks[0].quantity).toBe(20);
    expect(stocks[0].currentPrice).toBe(170.0);
  });

  it('should delete a stock', () => {
    const store = usePortfolioStore.getState();
    
    // Add stock
    store.addStock({
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 150.0,
      currentPrice: 160.0,
      dateOfPurchase: '2024-01-01',
    });

    const stockId = usePortfolioStore.getState().stocks[0].id;
    
    // Delete stock
    store.deleteStock(stockId);

    const stocks = usePortfolioStore.getState().stocks;
    expect(stocks).toHaveLength(0);
  });

  it('should calculate portfolio summary correctly', () => {
    const store = usePortfolioStore.getState();
    
    // Add multiple stocks
    store.addStock({
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      quantity: 10,
      purchasePrice: 100.0,
      currentPrice: 150.0,
      dateOfPurchase: '2024-01-01',
    });

    store.addStock({
      ticker: 'GOOGL',
      companyName: 'Alphabet Inc.',
      quantity: 5,
      purchasePrice: 2000.0,
      currentPrice: 2500.0,
      dateOfPurchase: '2024-01-01',
    });

    const summary = store.getPortfolioSummary();

    expect(summary.totalStocks).toBe(2);
    expect(summary.totalValue).toBe(14000.0); 
    expect(summary.totalCost).toBe(11000.0); 
    expect(summary.totalGainLoss).toBe(3000.0);
    expect(summary.totalGainLossPercentage).toBeCloseTo(27.27, 2);
  });

  it('should handle stocks with no current price by using purchase price', () => {
    const store = usePortfolioStore.getState();
    
    store.addStock({
      ticker: 'TSLA',
      companyName: 'Tesla Inc.',
      quantity: 10,
      purchasePrice: 200.0,
      dateOfPurchase: '2024-01-01',
    });

    const stocks = usePortfolioStore.getState().stocks;
    expect(stocks[0].currentPrice).toBe(200.0);
  });
});
