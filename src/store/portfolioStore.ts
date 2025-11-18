
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PortfolioSummary, Stock, StockFormData } from '../types/stock.types';

interface PortfolioState {
    stocks: Stock[];

    addStock: (stockData: StockFormData) => void;
    editStock: (id: string, stockData: Partial<StockFormData>) => void;
    deleteStock: (id: string) => void;
    getStockById: (id: string) => Stock | undefined;
    updateStockPrice: (id: string, newPrice: number) => void;

    getPortfolioSummary: () => PortfolioSummary;

    clearPortfolio: () => void;
}

const generateId = (): string => {
    return `stock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const calculateSummary = (stocks: Stock[]): PortfolioSummary => {
    const totalStocks = stocks.length;

    let totalValue = 0;
    let totalCost = 0;

    stocks.forEach((stock) => {
        totalValue += stock.quantity * stock.currentPrice;
        totalCost += stock.quantity * stock.purchasePrice;
    });

    const totalGainLoss = totalValue - totalCost;
    const totalGainLossPercentage = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

    return {
        totalStocks,
        totalValue,
        totalCost,
        totalGainLoss,
        totalGainLossPercentage,
    };
};

export const usePortfolioStore = create<PortfolioState>()(
    persist(
        (set, get) => ({
            stocks: [],

            addStock: (stockData: StockFormData) => {
                const now = new Date().toISOString();

                const newStock: Stock = {
                    id: generateId(),
                    ticker: stockData.ticker.toUpperCase(),
                    companyName: stockData.companyName,
                    quantity: stockData.quantity,
                    purchasePrice: stockData.purchasePrice,
                    currentPrice: stockData.currentPrice ?? stockData.purchasePrice,
                    dateOfPurchase: stockData.dateOfPurchase,
                    createdAt: now,
                    updatedAt: now,
                };

                set((state) => ({
                    stocks: [...state.stocks, newStock],
                }));
            },

            editStock: (id: string, stockData: Partial<StockFormData>) => {
                set((state) => ({
                    stocks: state.stocks.map((stock) => {
                        if (stock.id === id) {
                            return {
                                ...stock,
                                ticker: stockData.ticker?.toUpperCase() ?? stock.ticker,
                                companyName: stockData.companyName ?? stock.companyName,
                                quantity: stockData.quantity ?? stock.quantity,
                                purchasePrice: stockData.purchasePrice ?? stock.purchasePrice,
                                currentPrice: stockData.currentPrice ?? stock.currentPrice,
                                dateOfPurchase: stockData.dateOfPurchase ?? stock.dateOfPurchase,
                                updatedAt: new Date().toISOString(),
                            };
                        }
                        return stock;
                    }),
                }));
            },

            deleteStock: (id: string) => {
                set((state) => ({
                    stocks: state.stocks.filter((stock) => stock.id !== id),
                }));
            },

            getStockById: (id: string) => {
                return get().stocks.find((stock) => stock.id === id);
            },

            updateStockPrice: (id: string, newPrice: number) => {
                set((state) => ({
                    stocks: state.stocks.map((stock) => {
                        if (stock.id === id) {
                            return {
                                ...stock,
                                currentPrice: newPrice,
                                updatedAt: new Date().toISOString(),
                            };
                        }
                        return stock;
                    }),
                }));
            },

            getPortfolioSummary: () => {
                return calculateSummary(get().stocks);
            },

            clearPortfolio: () => {
                set({ stocks: [] });
            },
        }),
        {
            name: 'stock-portfolio-storage', 
            version: 1, 
        }
    )
);