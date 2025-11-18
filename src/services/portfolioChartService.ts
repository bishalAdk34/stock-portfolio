import type { Stock } from '../types/stock.types';

export interface PriceChartData {
    date: string;
    price: number;
}

export interface VolumeChartData {
    date: string;
    volume: number;
    gainLossPercentage: number;
}

export const generateStockPriceTrend = (stocks: Stock[]): PriceChartData[] => {
    const days = 30;
    const data: PriceChartData[] = [];

    for (let i = days; i >= 1; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        if (stocks.length === 0) {
            const basePrice = 150;
            const randomChange = (Math.random() - 0.5) * 10;
            const price = basePrice + randomChange + (Math.sin(i / 5) * 5);

            data.push({
                date: dateStr,
                price: parseFloat(price.toFixed(2)),
            });
        } else {
            const avgPrice = stocks.reduce((sum, stock) => sum + stock.currentPrice, 0) / stocks.length;
            const priceVariation = avgPrice * (0.98 + Math.random() * 0.04);

            data.push({
                date: dateStr,
                price: parseFloat(priceVariation.toFixed(2)),
            });
        }
    }

    return data;
};

export const generateVolumeTradedData = (stocks: Stock[]): VolumeChartData[] => {
    const days = 30;
    const data: VolumeChartData[] = [];

    for (let i = days; i >= 1; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        if (stocks.length === 0) {
            const randomVolume = Math.floor(Math.random() * 4000000) + 1000000;
            const randomGainLoss = (Math.random() - 0.5) * 10;

            data.push({
                date: dateStr,
                volume: randomVolume,
                gainLossPercentage: parseFloat(randomGainLoss.toFixed(2)),
            });
        } else {
            const totalVolume = stocks.reduce((sum, stock) => {
                return sum + stock.quantity * (50000 + Math.random() * 100000);
            }, 0);

            const avgGainLoss = stocks.reduce((sum, stock) => {
                const gain = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
                return sum + gain;
            }, 0) / stocks.length;

            data.push({
                date: dateStr,
                volume: Math.floor(totalVolume),
                gainLossPercentage: parseFloat(avgGainLoss.toFixed(2)),
            });
        }
    }

    return data;
};
