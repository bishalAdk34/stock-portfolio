
export interface Stock {
    id: string;
    ticker: string;
    companyName: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
    dateOfPurchase: string; 
    createdAt: string; 
    updatedAt: string; 
}

export interface StockFormData {
    ticker: string;
    companyName: string;
    quantity: number;
    purchasePrice: number;
    currentPrice?: number;
    dateOfPurchase: string;
}

export interface StockMetrics {
    totalValue: number; 
    totalCost: number; 
    gainLoss: number; 
    gainLossPercentage: number; 
}

export interface PortfolioSummary {
    totalStocks: number;
    totalValue: number;
    totalCost: number;
    totalGainLoss: number;
    totalGainLossPercentage: number;
}